import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import { fastifySwaggerUi } from '@fastify/swagger-ui'

import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'
import { ZodError } from 'zod'

import { env } from './env'

export const app = fastify().withTypeProvider()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// jwt token configuration
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

// register cors
app.register(fastifyCors, {
  origin: '*',
  credentials: true,
})

// swagger configuration
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Frind a Frind api.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Formato do token (opcional)
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  transform: jsonSchemaTransform,
})

//  register Swagger UI
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

// Register Cookies
app.register(fastifyCookie)

// application routes
// app.register()

// Set errors OK
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation Error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here e should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})
