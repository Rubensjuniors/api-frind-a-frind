import { OrganizationDoesNotExistError } from '@/errors/OrganizationDoesNotExistError'
import { makeRegisterPetsUseCase } from '@/use-cases/registerPet/make-register-pet-use-case'
import {
  LifeStageTypes,
  PetEnergy,
  PetIndependence,
  PetType,
} from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    life_stage: z.nativeEnum(LifeStageTypes),
    energy: z.nativeEnum(PetEnergy),
    independence: z.nativeEnum(PetIndependence),
    cover_photo: z.string(),
    photos: z.array(z.string()).optional(),
    city: z.string(),
    environment: z.string(),
    requirements: z.array(z.string()),
    type: z.nativeEnum(PetType),
    organizationId: z.string().uuid(),
  })

  const {
    about,
    city,
    cover_photo,
    energy,
    environment,
    independence,
    life_stage,
    name,
    organizationId,
    requirements,
    type,
    photos,
  } = requestBodySchema.parse(request.body)

  try {
    const resgistePetsUserUseCase = makeRegisterPetsUseCase()
    await resgistePetsUserUseCase.execute({
      about,
      city,
      cover_photo,
      energy,
      environment,
      independence,
      life_stage,
      name,
      organizationId,
      requirements,
      type,
      photos: photos ?? [],
    })
  } catch (err) {
    if (err instanceof OrganizationDoesNotExistError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
