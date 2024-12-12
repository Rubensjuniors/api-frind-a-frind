import { EmailAlreadyRegisteredError } from '@/errors/EmailAlreadyRegisteredError'
import { makeRegisterOrganizationUseCase } from '@/use-cases/resgister/make-register-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function registerOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    photo_url: z.string().optional(),
    cep: z.string(),
    phone: z.string(),
    street: z.string(),
  })

  const { email, cep, name, password, phone, street, photo_url } =
    requestBodySchema.parse(request.body)

  try {
    const resgisterOrganizationUseCase = makeRegisterOrganizationUseCase()
    await resgisterOrganizationUseCase.execute({
      email,
      cep,
      name,
      password,
      phone,
      street,
      photo_url,
    })
  } catch (err) {
    if (err instanceof EmailAlreadyRegisteredError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
