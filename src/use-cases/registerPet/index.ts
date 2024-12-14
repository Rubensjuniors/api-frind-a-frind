import { PetsRepository } from '@/repositories/types/pets-repository'
import { RegisterPetUseCaseRequest, RegisterPetUseCaseResponse } from './types'
import { prisma } from '@/lib/prisma'
import { OrganizationDoesNotExistError } from '@/errors/OrganizationDoesNotExistError'

export class RegisterPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    data: RegisterPetUseCaseRequest,
  ): Promise<RegisterPetUseCaseResponse> {
    const checkOrganization = await prisma.organization.findUnique({
      where: {
        id: data.organizationId,
      },
    })

    if (!checkOrganization) {
      throw new OrganizationDoesNotExistError()
    }

    const pet = await prisma.pet.create({
      data,
    })

    return {
      pet,
    }
  }
}
