import { StudentScore } from './StudentScore';

export abstract class Group {
  protected code: string;
  protected subjectCodes: string[];

  constructor(code: string, subjectCodes: string[]) {
    this.code = code;
    this.subjectCodes = subjectCodes;
  }

  getCode(): string {
    return this.code;
  }

  getSubjects(): string[] {
    return this.subjectCodes;
  }

  isEligible(studentScore: StudentScore): boolean {
    return this.subjectCodes.every(code => studentScore.hasSubject(code));
  }

  calculateTotal(studentScore: StudentScore): number | null {
    if (!this.isEligible(studentScore)) return null;

    const total = this.subjectCodes.reduce((sum, code) => {
      const score = studentScore.getScore(code);
      return sum + (score || 0);
    }, 0);

    return total;
  }
}
