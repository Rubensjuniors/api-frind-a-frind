import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const user = {
    ...request.user,
    password_hash: undefined,
  }

  console.log(user)

  const token = await reply.jwtSign(
    {
      ...user,
    },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )
  const refreshToken = await reply.jwtSign(
    { ...user },
    {
      sign: {
        sub: request.user.sub,
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
    .send({
      token,
    })
}
