import {
  LifeStageTypes,
  Pet,
  PetEnergy,
  PetIndependence,
  PetType,
} from '@prisma/client'

export type fetchPetUseCaseRequest = {
  city: string
  life_stage?: LifeStageTypes
  energy?: PetEnergy
  independence?: PetIndependence
  type?: PetType
}

export interface fetchPetUseCaseResponse {
  pets: Pet[] | null
}
