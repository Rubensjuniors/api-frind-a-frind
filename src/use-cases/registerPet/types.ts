import { Pet } from '@prisma/client'

export type RegisterPetUseCaseRequest = Omit<Pet, 'id'>

export interface RegisterPetUseCaseResponse {
  pet: Pet
}
