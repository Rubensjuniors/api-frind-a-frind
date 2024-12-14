import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '.'
import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'

export function makeAuthenticateuseCase() {
  const prismaUsers = new PrismaUsersRepository()
  const prismaOrganization = new PrismaOrganizationRepository()
  const authenticateUseCase = new AuthenticateUseCase(
    prismaUsers,
    prismaOrganization,
  )

  return authenticateUseCase
}
