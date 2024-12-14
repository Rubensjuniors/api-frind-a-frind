import { Pet } from '@prisma/client'

export type getPetUseCaseRequest = {
  id: string
}

export interface getPetUseCaseResponse {
  pet: Pet | null
}
