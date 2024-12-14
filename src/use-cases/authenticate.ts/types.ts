import { Organization, User } from '@prisma/client'

export interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

export interface AuthenticateUserUseCaseResponse {
  user: User
}
export interface AuthenticateOrgUseCaseResponse {
  organization: Organization
}
