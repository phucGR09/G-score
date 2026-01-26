import { Student } from '@prisma/client';
import prisma from '../config/database';

export class ScoreRepository {
  async findByRegistrationNumber(sbd: string): Promise<Student | null> {
    return await prisma.student.findUnique({
      where: { sbd }
    });
  }
}
