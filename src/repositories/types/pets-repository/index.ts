import {
  LifeStageTypes,
  Pet,
  PetEnergy,
  PetIndependence,
  PetSize,
  Prisma,
} from '@prisma/client'

export type CharacteristicsParams = {
  life_stage?: LifeStageTypes
  energy?: PetEnergy
  size?: PetSize
  independence?: PetIndependence
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  getPets(city: string, data?: CharacteristicsParams): Promise<Pet[] | null>
  create(data: Prisma.PetCreateInput): Promise<Pet>
}
