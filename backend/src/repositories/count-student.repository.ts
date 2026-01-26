import prisma from '../config/database';

export interface CountStudentData {
  totalStudents: number;
  invalidStudents: number;
}

export class CountStudentRepository {
  async getCountStudent(): Promise<CountStudentData | null> {
    const result = await prisma.countStudent.findFirst({
      orderBy: { updatedAt: 'desc' }
    });
    
    if (!result) return null;
    
    return {
      totalStudents: result.totalStudents,
      invalidStudents: result.invalidStudents
    };
  }

  async upsertCountStudent(totalStudents: number, invalidStudents: number) {
    await prisma.countStudent.deleteMany();
    return await prisma.countStudent.create({
      data: {
        totalStudents,
        invalidStudents
      }
    });
  }

  async calculateCountStudent(): Promise<CountStudentData> {
    const total = await prisma.student.count();
    
    const invalid = await prisma.student.count({
      where: {
        OR: [
          { toan: null },
          { ngu_van: null },
          {
            AND: [
              { ma_ngoai_ngu: { not: null } },
              { ngoai_ngu: null }
            ]
          }
        ]
      }
    });

    return {
      totalStudents: total,
      invalidStudents: invalid
    };
  }
}
