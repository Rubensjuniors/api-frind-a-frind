import { EmailAlreadyRegisteredError } from '@/errors/EmailAlreadyRegisteredError'
import { makeRegisterUseCase } from '@/use-cases/resgister/make-register-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function registerUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    photo_url: z.string().optional(),
  })

  const { email, name, password, photo_url } = requestBodySchema.parse(
    request.body,
  )

  try {
    const resgisterUserUseCase = makeRegisterUseCase()
    await resgisterUserUseCase.registerUser({
      email,
      name,
      password,
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
