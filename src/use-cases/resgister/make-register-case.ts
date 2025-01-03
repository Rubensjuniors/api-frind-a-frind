import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '.'
import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'

export function makeRegisterUseCase() {
  const prismaUsers = new PrismaUsersRepository()
  const prismaOrganization = new PrismaOrganizationRepository()
  const registerUseCase = new RegisterUserUseCase(
    prismaUsers,
    prismaOrganization,
  )

  return registerUseCase
}
