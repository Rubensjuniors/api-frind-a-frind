import { prisma } from '@/lib/prisma'
import { OrganizationsRepository } from '@/repositories/types/organizations-repository'
import { Prisma } from '@prisma/client'

export class PrismaOrganizationRepository implements OrganizationsRepository {
  async findById(id: string) {
    const organization = prisma.organization.findUnique({
      where: {
        id,
      },
    })

    return organization
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = prisma.organization.create({
      data,
    })

    return organization
  }
}
