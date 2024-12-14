import { PetsRepository } from '@/repositories/types/pets-repository'
import { getPetUseCaseRequest, getPetUseCaseResponse } from './types'

export class GetPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: getPetUseCaseRequest): Promise<getPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    return {
      pet,
    }
  }
}
