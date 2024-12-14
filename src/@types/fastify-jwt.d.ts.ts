import '@fastify/jwt'
import { EntityType } from '@prisma/client'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      name: string
      email: string
      created_at: Date
      photo_url: string | null
      entityType: EntityType
      cep?: string
      street?: string
      phone?: string
    }
  }
}
