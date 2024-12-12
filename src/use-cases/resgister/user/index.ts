import { UsersRepository } from '@/repositories/types/users-repository'
import { hash } from 'bcryptjs'
import { EmailAlreadyRegisteredError } from '@/errors/EmailAlreadyRegisteredError'
import { RegisterUseCaseRequest, RegisterUseCaseResponse } from '../types'

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
    photo_url,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const checkEmail = await this.usersRepository.findByEmail(email)

    if (checkEmail) {
      throw new EmailAlreadyRegisteredError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      photo_url,
    })

    return {
      user,
    }
  }
}
