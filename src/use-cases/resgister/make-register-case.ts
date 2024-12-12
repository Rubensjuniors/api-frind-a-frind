import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from './user'
import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { RegisterOrganizationUseCase } from './organization'

export function makeRegisterUserUseCase() {
  const prismaUsers = new PrismaUsersRepository()
  const registerUseCase = new RegisterUserUseCase(prismaUsers)

  return registerUseCase
}

export function makeRegisterOrganizationUseCase() {
  const prismaOrganization = new PrismaOrganizationRepository()
  const registerOrganizationUseCase = new RegisterOrganizationUseCase(
    prismaOrganization,
  )

  return registerOrganizationUseCase
}
