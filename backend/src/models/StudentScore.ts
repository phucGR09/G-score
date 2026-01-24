import { Student } from './Student';
import { Score } from './Score';

export class StudentScore {
  private student: Student;
  private scores: Map<string, Score>;

  constructor(student: Student) {
    this.student = student;
    this.scores = new Map();
  }

  getStudent(): Student {
    return this.student;
  }

  addScore(score: Score): void {
    this.scores.set(score.getSubject().getCode(), score);
  }

  getScore(subjectCode: string): number | null {
    const score = this.scores.get(subjectCode);
    return score ? score.getValue() : null;
  }

  hasSubject(subjectCode: string): boolean {
    return this.scores.has(subjectCode);
  }

  getAllScores(): Score[] {
    return Array.from(this.scores.values());
  }

  getAverage(): number | null {
    const scores = this.getAllScores();
    if (scores.length === 0) return null;
    
    const total = scores.reduce((sum, score) => sum + score.getValue(), 0);
    return total / scores.length;
  }
}
