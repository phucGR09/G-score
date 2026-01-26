import { StatisticsRepository } from '../repositories/statistics.repository';
import { SummaryRepository } from '../repositories/summary.repository';
import { ScoreRangeRepository } from '../repositories/score-range.repository';
import { CountStudentRepository } from '../repositories/count-student.repository';
import redisClient from '../config/redis';

const SUBJECTS = ['toan', 'vat_li', 'hoa_hoc', 'sinh_hoc', 'ngu_van', 'ngoai_ngu', 'lich_su', 'dia_li', 'gdcd'];

export class StatisticsCalculator {
  constructor(
    private statsRepo: StatisticsRepository = new StatisticsRepository(),
    private summaryRepo: SummaryRepository = new SummaryRepository(),
    private scoreRangeRepo: ScoreRangeRepository = new ScoreRangeRepository(),
    private countStudentRepo: CountStudentRepository = new CountStudentRepository()
  ) {}

  async calculateAndUpdate() {
    const levelResults = await this.statsRepo.getSubjectStatistics();

    for (const row of levelResults) {
      const subject = row.subject;
      await this.summaryRepo.upsertStatistics(subject, '>=8', Number(row.excellent));
      await this.summaryRepo.upsertStatistics(subject, '6-8', Number(row.good));
      await this.summaryRepo.upsertStatistics(subject, '4-6', Number(row.average));
      await this.summaryRepo.upsertStatistics(subject, '<4', Number(row.poor));
    }

    const scoreRangeResults = await this.statsRepo.getScoreCountsByRange();

    for (const row of scoreRangeResults) {
      await this.scoreRangeRepo.upsertScoreRange(row.subject, row.score_range, Number(row.count));
    }

    const countData = await this.countStudentRepo.calculateCountStudent();
    await this.countStudentRepo.upsertCountStudent(countData.totalStudents, countData.invalidStudents);

    await this.clearCache();
  }

  async clearCache() {
    const keys = await redisClient.keys('stats:*');
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  }
}
