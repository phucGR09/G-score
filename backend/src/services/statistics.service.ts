import { GroupA } from '../models/GroupA';
import { Student } from '../models/Student';
import { StudentScore } from '../models/StudentScore';
import { Score } from '../models/Score';
import { SubjectCollection } from '../models/SubjectCollection';
import { SubjectFactory } from '../models/SubjectFactory';
import { StatisticsRepository } from '../repositories/statistics.repository';
import { SummaryRepository } from '../repositories/summary.repository';
import { ScoreRangeRepository } from '../repositories/score-range.repository';
import { CountStudentRepository } from '../repositories/count-student.repository';
import redisClient from '../config/redis';
import { CountStudentDto } from '../dtos/count-student.dto';

interface ScoreLevelStatistics {
  excellent: number;
  good: number;
  average: number;
  poor: number;
}

interface SubjectStatistics {
  [subject: string]: ScoreLevelStatistics;
}

interface ScoreCountData {
  [subject: string]: number[];
}

export class StatisticsService {
  constructor(
    private repository: StatisticsRepository = new StatisticsRepository(),
    private summaryRepository: SummaryRepository = new SummaryRepository(),
    private scoreRangeRepository: ScoreRangeRepository = new ScoreRangeRepository(),
    private countStudentRepository: CountStudentRepository = new CountStudentRepository()
  ) {}

  async calculateSubjectStatistics(): Promise<SubjectStatistics> {
    const cacheKey = 'stats:all';
    const cached = await redisClient.get(cacheKey);
    
    if (cached) {
      return JSON.parse(cached);
    }

    const summaryData = await this.summaryRepository.getStatisticsBySubject('');
    
    if (summaryData.length === 0) {
      const results = await this.repository.getSubjectStatistics();
      const statistics: SubjectStatistics = {};
      for (const row of results) {
        statistics[row.subject] = {
          excellent: Number(row.excellent),
          good: Number(row.good),
          average: Number(row.average),
          poor: Number(row.poor)
        };
      }
      return statistics;
    }

    const statistics: SubjectStatistics = {};
    for (const row of summaryData) {
      if (!statistics[row.subject]) {
        statistics[row.subject] = { excellent: 0, good: 0, average: 0, poor: 0 };
      }
      
      if (row.level === '>=8') statistics[row.subject].excellent = row.count;
      else if (row.level === '6-8') statistics[row.subject].good = row.count;
      else if (row.level === '4-6') statistics[row.subject].average = row.count;
      else if (row.level === '<4') statistics[row.subject].poor = row.count;
    }

    await redisClient.setEx(cacheKey, 300, JSON.stringify(statistics));
    return statistics;
  }

  async getTopStudentsGroupA(limit: number = 10): Promise<StudentScore[]> {
    const results = await this.repository.findTopStudentsByGroupA(limit);

    const subjects = new SubjectCollection();
    subjects.add(SubjectFactory.createCore('toan', 'Toán học'));
    subjects.add(SubjectFactory.createNaturalScience('vat_li', 'Vật lý'));
    subjects.add(SubjectFactory.createNaturalScience('hoa_hoc', 'Hóa học'));

    return results.map(row => {
      const student = new Student(row.sbd, row.full_name || undefined);
      const studentScore = new StudentScore(student);

      const toanSubject = subjects.get('toan');
      const vatLiSubject = subjects.get('vat_li');
      const hoaHocSubject = subjects.get('hoa_hoc');

      if (toanSubject) {
        studentScore.addScore(new Score(toanSubject, row.toan));
      }
      if (vatLiSubject) {
        studentScore.addScore(new Score(vatLiSubject, row.vat_li));
      }
      if (hoaHocSubject) {
        studentScore.addScore(new Score(hoaHocSubject, row.hoa_hoc));
      }

      return studentScore;
    });
  }

  getGroupA(): GroupA {
    return new GroupA();
  }

  async getScoreCountsByRange(): Promise<ScoreCountData> {
    const cacheKey = 'stats:score-ranges';
    const cached = await redisClient.get(cacheKey);
    
    if (cached) {
      return JSON.parse(cached);
    }

    const summaryData = await this.scoreRangeRepository.getScoreRangesBySubject('');
    
    if (summaryData.length === 0) {
      const results = await this.repository.getScoreCountsByRange();
      const scoreCounts: ScoreCountData = {};
      
      for (const row of results) {
        if (!scoreCounts[row.subject]) {
          scoreCounts[row.subject] = new Array(11).fill(0);
        }
        scoreCounts[row.subject][row.score_range] = Number(row.count);
      }
      return scoreCounts;
    }

    const scoreCounts: ScoreCountData = {};
    for (const row of summaryData) {
      if (!scoreCounts[row.subject]) {
        scoreCounts[row.subject] = new Array(11).fill(0);
      }
      scoreCounts[row.subject][row.scoreRange] = row.count;
    }

    await redisClient.setEx(cacheKey, 300, JSON.stringify(scoreCounts));
    return scoreCounts;
  }

  async getCountStudent(): Promise<CountStudentDto> {
    const cacheKey = 'stats:count-student';
    const cached = await redisClient.get(cacheKey);
    
    if (cached) {
      return JSON.parse(cached);
    }

    const data = await this.countStudentRepository.getCountStudent();
    
    if (!data) {
      const calculated = await this.countStudentRepository.calculateCountStudent();
      const result: CountStudentDto = {
        totalStudents: calculated.totalStudents,
        invalidStudents: calculated.invalidStudents,
        validStudents: calculated.totalStudents - calculated.invalidStudents
      };
      return result;
    }

    const result: CountStudentDto = {
      totalStudents: data.totalStudents,
      invalidStudents: data.invalidStudents,
      validStudents: data.totalStudents - data.invalidStudents
    };

    await redisClient.setEx(cacheKey, 300, JSON.stringify(result));
    return result;
  }
}
