import { Student } from '../models/Student';
import { StudentScore } from '../models/StudentScore';
import { Score } from '../models/Score';
import { SubjectCollection } from '../models/SubjectCollection';
import { SubjectFactory } from '../models/SubjectFactory';
import { ScoreRepository } from '../repositories/score.repository';

const initializeSubjects = (): SubjectCollection => {
  const subjects = new SubjectCollection();
  
  subjects.add(SubjectFactory.createCore('toan', 'Toán học'));
  subjects.add(SubjectFactory.createCore('ngu_van', 'Ngữ văn'));
  
  subjects.add(SubjectFactory.createNaturalScience('vat_li', 'Vật lý'));
  subjects.add(SubjectFactory.createNaturalScience('hoa_hoc', 'Hóa học'));
  subjects.add(SubjectFactory.createNaturalScience('sinh_hoc', 'Sinh học'));
  
  subjects.add(SubjectFactory.createSocialScience('lich_su', 'Lịch sử'));
  subjects.add(SubjectFactory.createSocialScience('dia_li', 'Địa lý'));
  subjects.add(SubjectFactory.createSocialScience('gdcd', 'Giáo dục công dân'));
  
  subjects.add(SubjectFactory.createForeignLanguage('ngoai_ngu', 'Ngoại ngữ', 'N1'));
  
  return subjects;
};

export class ScoreService {
  private subjects: SubjectCollection;

  constructor(private repository: ScoreRepository = new ScoreRepository()) {
    this.subjects = initializeSubjects();
  }

  async findStudentByRegistrationNumber(sbd: string): Promise<StudentScore | null> {
    const studentData = await this.repository.findByRegistrationNumber(sbd);

    if (!studentData) {
      return null;
    }

    const student = new Student(studentData.sbd, studentData.fullName || undefined);
    const studentScore = new StudentScore(student);

    const scoreFields = [
      { code: 'toan', value: studentData.toan },
      { code: 'ngu_van', value: studentData.ngu_van },
      { code: 'vat_li', value: studentData.vat_li },
      { code: 'hoa_hoc', value: studentData.hoa_hoc },
      { code: 'sinh_hoc', value: studentData.sinh_hoc },
      { code: 'lich_su', value: studentData.lich_su },
      { code: 'dia_li', value: studentData.dia_li },
      { code: 'gdcd', value: studentData.gdcd },
      { code: 'ngoai_ngu', value: studentData.ngoai_ngu }
    ];

    for (const field of scoreFields) {
      if (field.value !== null) {
        const subject = this.subjects.get(field.code);
        if (subject) {
          studentScore.addScore(new Score(subject, field.value));
        }
      }
    }

    return studentScore;
  }
}
