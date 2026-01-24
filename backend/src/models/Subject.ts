export abstract class Subject {
  protected code: string;
  protected name: string;

  constructor(code: string, name: string) {
    this.code = code;
    this.name = name;
  }

  getCode(): string {
    return this.code;
  }

  getName(): string {
    return this.name;
  }

  equals(subject: Subject): boolean {
    return this.code === subject.getCode();
  }
}
