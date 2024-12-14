import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetsUseCase } from '.'

export function makeGetPetsUseCase() {
  const prismaPets = new PrismaPetsRepository()
  const getPetsUseCase = new GetPetsUseCase(prismaPets)

  return getPetsUseCase
}
