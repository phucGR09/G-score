import prisma from '../config/database';

export class ScoreRangeRepository {
  async upsertScoreRange(subject: string, scoreRange: number, count: number) {
    return await prisma.scoreRangeSummary.upsert({
      where: { subject_scoreRange: { subject, scoreRange } },
      update: { count },
      create: { subject, scoreRange, count }
    });
  }

  async getScoreRangesBySubject(subject: string) {
    if (subject) {
      return await prisma.scoreRangeSummary.findMany({
        where: { subject },
        orderBy: { scoreRange: 'asc' }
      });
    }
    return await prisma.scoreRangeSummary.findMany({
      orderBy: [{ subject: 'asc' }, { scoreRange: 'asc' }]
    });
  }

  async deleteAll() {
    return await prisma.scoreRangeSummary.deleteMany();
  }
}
