import { Prisma, CheckIn } from '@prisma/client'

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByuserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
