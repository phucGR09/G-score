import prisma from '../config/database';

export class SummaryRepository {
  async upsertStatistics(subject: string, level: string, count: number) {
    return await prisma.statisticsSummary.upsert({
      where: { subject_level: { subject, level } },
      update: { count },
      create: { subject, level, count }
    });
  }

  async getStatisticsBySubject(subject: string) {
    if (subject) {
      return await prisma.statisticsSummary.findMany({
        where: { subject },
        orderBy: { level: 'asc' }
      });
    }
    return await prisma.statisticsSummary.findMany({
      orderBy: [{ subject: 'asc' }, { level: 'asc' }]
    });
  }

  async deleteAll() {
    return await prisma.statisticsSummary.deleteMany();
  }
}
