import { GroupA } from '../models/GroupA';
import { Student } from '../models/Student';
import { StudentScore } from '../models/StudentScore';
import { Score } from '../models/Score';
import { SubjectCollection } from '../models/SubjectCollection';
import { SubjectFactory } from '../models/SubjectFactory';
import { StatisticsRepository } from '../repositories/statistics.repository';

interface ScoreLevelStatistics {
  excellent: number;
  good: number;
  average: number;
  poor: number;
}

interface SubjectStatistics {
  [subject: string]: ScoreLevelStatistics;
}

export class StatisticsService {
  constructor(private repository: StatisticsRepository = new StatisticsRepository()) {}

  async calculateSubjectStatistics(): Promise<SubjectStatistics> {
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
}
