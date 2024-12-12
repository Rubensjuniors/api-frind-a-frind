import { Organization, User } from '@prisma/client'

export interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  photo_url?: string
}

export interface RegisterUseCaseResponse {
  user: User
}

export interface RegisterOrganizationUseCaseRequest {
  name: string
  email: string
  password: string
  photo_url?: string
  cep: string
  street: string
  phone: string
}

export interface RegisterOrganizationUseCaseResponse {
  organization: Organization
}
