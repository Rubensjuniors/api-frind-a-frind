import { makeGetPetsUseCase } from '@/use-cases/getPet/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const requestParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = requestParamsSchema.parse(request.params)

  const getPetsUserUseCase = makeGetPetsUseCase()
  const { pet } = await getPetsUserUseCase.execute({ id })

  return reply.status(200).send(pet)
}
