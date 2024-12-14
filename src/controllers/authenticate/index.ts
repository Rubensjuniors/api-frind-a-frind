import { InvalidCredentialsError } from '@/errors/InvalidCredentialsError'
import { makeAuthenticateuseCase } from '@/use-cases/authenticate.ts/make-authenticate-use-case'
import { EntityType } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    type: z.nativeEnum(EntityType),
  })

  const { email, password, type } = requestBodySchema.parse(request.body)

  const getUserOrOrg = async () => {
    const authenticatedUseCase = makeAuthenticateuseCase()

    if (type === EntityType.ORGANIZATION) {
      const { organization } =
        await authenticatedUseCase.AuthenticateOrganization({ email, password })
      return organization
    }

    if (type === EntityType.USER) {
      const { user } = await authenticatedUseCase.AuthenticateUser({
        email,
        password,
      })
      return user
    }

    throw new Error('Invalid entity type')
  }

  try {
    const userOrOrg = await getUserOrOrg()

    if (!userOrOrg) {
      throw new Error('ID not found in the response')
    }

    const token = await reply.jwtSign(
      {
        ...userOrOrg,
        password_hash: undefined,
      },
      {
        sign: {
          sub: userOrOrg.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        ...userOrOrg,
        password_hash: undefined,
      },
      {
        sign: {
          sub: userOrOrg.id,
          expiresIn: '1d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
