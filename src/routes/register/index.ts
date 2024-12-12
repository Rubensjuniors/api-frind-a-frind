import { registerOrganization } from '@/controllers/register/organization'
import { registerUser } from '@/controllers/register/user'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const registeRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/register/user',
    {
      schema: {
        tags: ['register'],
        operationId: 'createUser',
        description: 'Create user.',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(8),
          photo_url: z.string().optional(),
        }),
        response: {
          201: z.object({}),
          409: z.object({ message: z.string() }),
        },
      },
    },
    registerUser,
  )
  app.post(
    '/register/organization',
    {
      schema: {
        tags: ['register'],
        operationId: 'createOrganization',
        description: 'Create Organization.',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(8),
          photo_url: z.string().optional(),
          cep: z.string(),
          phone: z.string(),
          street: z.string(),
        }),
        response: {
          201: z.object({}),
          409: z.object({ message: z.string() }),
        },
      },
    },
    registerOrganization,
  )
}
