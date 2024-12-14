import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RegisterPetsUseCase } from '.'

export function makeRegisterPetsUseCase() {
  const prismaPets = new PrismaPetsRepository()
  const registerPetsUseCase = new RegisterPetsUseCase(prismaPets)

  return registerPetsUseCase
}
