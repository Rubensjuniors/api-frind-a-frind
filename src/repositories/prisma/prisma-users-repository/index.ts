import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { UsersRepository } from '@/repositories/types/users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = prisma.user.create({
      data,
    })

    return user
  }
}
