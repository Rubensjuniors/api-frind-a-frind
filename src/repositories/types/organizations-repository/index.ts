import { Prisma, Organization } from '@prisma/client'

export interface OrganizationsRepository {
  findById(id: string): Promise<Organization | null>
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
}
