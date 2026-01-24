import { Subject } from './Subject';

export class Score {
  private subject: Subject;
  private value: number;

  constructor(subject: Subject, value: number) {
    this.subject = subject;
    this.value = value;
  }

  getSubject(): Subject {
    return this.subject;
  }

  getValue(): number {
    return this.value;
  }

  isValid(): boolean {
    return this.value >= 0 && this.value <= 10;
  }
}
