import { prisma } from '@/lib/prisma'
import {
  CharacteristicsParams,
  PetsRepository,
} from '@/repositories/types/pets-repository'
import { Prisma } from '@prisma/client'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async fetchPets(data: CharacteristicsParams) {
    const pets = prisma.pet.findMany({
      where: {
        ...data,
      },
    })

    return pets
  }

  async create(data: Prisma.PetCreateInput) {
    const pet = prisma.pet.create({
      data,
    })

    return pet
  }
}
