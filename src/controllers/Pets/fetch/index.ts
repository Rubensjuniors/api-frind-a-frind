import { makeFetchPetsUseCase } from '@/use-cases/fetchPets/make-fetch-pet-use-case'
import {
  LifeStageTypes,
  PetEnergy,
  PetIndependence,
  PetType,
} from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function fetchPets(request: FastifyRequest, reply: FastifyReply) {
  const requestQuerySchema = z.object({
    city: z.string(),
    life_stage: z.nativeEnum(LifeStageTypes).optional(),
    energy: z.nativeEnum(PetEnergy).optional(),
    independence: z.nativeEnum(PetIndependence).optional(),
    type: z.nativeEnum(PetType).optional(),
  })

  const { city, energy, independence, life_stage, type } =
    requestQuerySchema.parse(request.query)

  const fetchPetsUserUseCase = makeFetchPetsUseCase()
  const { pets } = await fetchPetsUserUseCase.execute({
    city,
    energy,
    independence,
    life_stage,
    type,
  })

  return reply.status(200).send(pets)
}
