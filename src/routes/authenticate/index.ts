import { authenticate } from '@/controllers/authenticate'
import { refresh } from '@/controllers/authenticate/refrash'
import { EntityType } from '@prisma/client'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const authenticateRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/sessions',
    {
      schema: {
        tags: ['authenticate'],
        operationId: 'authenticate',
        description: 'authenticate user.',
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
          type: z.nativeEnum(EntityType).default(EntityType.USER),
        }),
        response: {
          200: z.object({ token: z.string() }),
          400: z.object({ message: z.string() }),
        },
      },
    },
    authenticate,
  )

  app.patch(
    '/token/refresh',
    {
      schema: {
        tags: ['authenticate'],
        operationId: 'refresh token User',
        description: 'refresh token  user.',
        response: {
          200: z.object({ token: z.string() }),
        },
      },
    },
    refresh,
  )
}
