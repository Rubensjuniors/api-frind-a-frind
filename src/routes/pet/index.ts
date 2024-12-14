import { fetchPets } from '@/controllers/Pets/fetch'
import { getPet } from '@/controllers/Pets/get'
import { registerPet } from '@/controllers/registerPets'
import { verifyJWT } from '@/middlewares/verifyJWT'
import {
  LifeStageTypes,
  PetEnergy,
  PetIndependence,
  PetType,
} from '@prisma/client'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const petsRoutes: FastifyPluginAsyncZod = async (app) => {
  app.addHook('onRequest', verifyJWT)
  app.post(
    '/register/pet',
    {
      schema: {
        tags: ['pet'],
        operationId: 'createPet',
        description: 'Create pet.',
        body: z.object({
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
        }),
        response: {
          201: z.object({}),
          409: z.object({ message: z.string() }),
        },
      },
    },
    registerPet,
  )
  app.get(
    '/pets',
    {
      schema: {
        tags: ['pet'],
        operationId: 'fetchPet',
        description: 'Fetch pet.',
        query: z.object({
          city: z.string(),
          life_stage: z.nativeEnum(LifeStageTypes).optional(),
          energy: z.nativeEnum(PetEnergy).optional(),
          independence: z.nativeEnum(PetIndependence).optional(),
          type: z.nativeEnum(PetType).optional(),
        }),
        response: {
          200: z.array(
            z.object({
              id: z.string().uuid(),
              name: z.string(),
              about: z.string(),
              life_stage: z.nativeEnum(LifeStageTypes),
              energy: z.nativeEnum(PetEnergy),
              independence: z.nativeEnum(PetIndependence),
              city: z.string(),
              environment: z.string(),
              photos: z.array(z.string()),
              cover_photo: z.string(),
              requirements: z.array(z.string()),
              type: z.nativeEnum(PetType),
              organizationId: z.string().uuid(),
            }),
          ),
        },
      },
    },
    fetchPets,
  )
  app.get(
    '/pets/:id',
    {
      schema: {
        tags: ['pet'],
        operationId: 'fetchPet',
        description: 'Fetch pet.',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            id: z.string().uuid(),
            name: z.string(),
            about: z.string(),
            life_stage: z.nativeEnum(LifeStageTypes),
            energy: z.nativeEnum(PetEnergy),
            independence: z.nativeEnum(PetIndependence),
            city: z.string(),
            environment: z.string(),
            photos: z.array(z.string()),
            cover_photo: z.string(),
            requirements: z.array(z.string()),
            type: z.nativeEnum(PetType),
            organizationId: z.string().uuid(),
          }),
        },
      },
    },
    getPet,
  )
}
