import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsUseCase } from '.'

export function makeFetchPetsUseCase() {
  const prismaPets = new PrismaPetsRepository()
  const fetchPetsUseCase = new FetchPetsUseCase(prismaPets)

  return fetchPetsUseCase
}
