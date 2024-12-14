import {
  LifeStageTypes,
  Pet,
  PetEnergy,
  PetIndependence,
  PetSize,
  Prisma,
} from '@prisma/client'

export type CharacteristicsParams = {
  city: string
  life_stage?: LifeStageTypes
  energy?: PetEnergy
  size?: PetSize
  independence?: PetIndependence
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  fetchPets(data: CharacteristicsParams): Promise<Pet[] | null>
  create(data: Prisma.PetCreateInput): Promise<Pet>
}
