import { OrganizationsRepository } from '@/repositories/types/organizations-repository'
import { UsersRepository } from '@/repositories/types/users-repository'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '@/errors/InvalidCredentialsError'
import {
  AuthenticateOrgUseCaseResponse,
  AuthenticateUseCaseRequest,
  AuthenticateUserUseCaseResponse,
} from './types'

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async AuthenticateUser({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }

  async AuthenticateOrganization({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const organization = await this.organizationsRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(
      password,
      organization.password_hash,
    )

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      organization,
    }
  }
}
