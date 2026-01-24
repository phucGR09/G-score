import { Subject } from './Subject';

export class SubjectCollection {
  private subjects: Map<string, Subject>;

  constructor() {
    this.subjects = new Map();
  }

  add(subject: Subject): void {
    this.subjects.set(subject.getCode(), subject);
  }

  get(code: string): Subject | null {
    return this.subjects.get(code) || null;
  }

  exists(code: string): boolean {
    return this.subjects.has(code);
  }

  all(): Subject[] {
    return Array.from(this.subjects.values());
  }

  filterByType<T extends Subject>(type: new (...args: any[]) => T): T[] {
    return this.all().filter((subject): subject is T => subject instanceof type);
  }
}
