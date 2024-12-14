import { PetsRepository } from '@/repositories/types/pets-repository'
import { fetchPetUseCaseRequest, fetchPetUseCaseResponse } from './types'
import { CityAndMandatoryError } from '@/errors/CityAndMandatoryError'

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    data: fetchPetUseCaseRequest,
  ): Promise<fetchPetUseCaseResponse> {
    if (!data.city) {
      throw new CityAndMandatoryError()
    }

    const pets = await this.petsRepository.fetchPets(data)

    return {
      pets,
    }
  }
}
