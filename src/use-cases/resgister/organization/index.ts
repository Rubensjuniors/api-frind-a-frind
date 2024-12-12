import { hash } from 'bcryptjs'
import { EmailAlreadyRegisteredError } from '@/errors/EmailAlreadyRegisteredError'
import { OrganizationsRepository } from '@/repositories/types/organizations-repository'
import { prisma } from '@/lib/prisma'
import {
  RegisterOrganizationUseCaseRequest,
  RegisterOrganizationUseCaseResponse,
} from '../types'

export class RegisterOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
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

    const organization = await prisma.organization.create({
      data: {
        name,
        email,
        password_hash,
        photo_url,
        cep,
        phone,
        street,
      },
    })

    return {
      organization,
    }
  }
}
