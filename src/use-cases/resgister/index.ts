import { UsersRepository } from '@/repositories/types/users-repository'
import { hash } from 'bcryptjs'
import { EmailAlreadyRegisteredError } from '@/errors/EmailAlreadyRegisteredError'
import {
  RegisterOrganizationUseCaseRequest,
  RegisterOrganizationUseCaseResponse,
  RegisterUseCaseRequest,
  RegisterUseCaseResponse,
} from './types'
import { OrganizationsRepository } from '@/repositories/types/organizations-repository'

export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async registerUser({
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

  async registerOrganization({
    email,
    name,
    password,
    photo_url,
    cep,
    phone,
    street,
  }: RegisterOrganizationUseCaseRequest): Promise<RegisterOrganizationUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const checkEmail = await this.organizationsRepository.findByEmail(email)

    if (checkEmail) {
      throw new EmailAlreadyRegisteredError()
    }

    const organization = await this.organizationsRepository.create({
      name,
      email,
      password_hash,
      photo_url,
      cep,
      phone,
      street,
    })

    return {
      organization,
    }
  }
}
