export class Student {
  private sbd: string;
  private fullName?: string;

  constructor(sbd: string, fullName?: string) {
    this.sbd = sbd;
    this.fullName = fullName;
  }

  getSbd(): string {
    return this.sbd;
  }

  getFullName(): string | undefined {
    return this.fullName;
  }
}
