import { PrismaClient, Student } from '@prisma/client';

const prisma = new PrismaClient();

export class ScoreRepository {
  async findByRegistrationNumber(sbd: string): Promise<Student | null> {
    return await prisma.student.findUnique({
      where: { sbd }
    });
  }
}
