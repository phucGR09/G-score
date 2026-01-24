import { Subject } from './Subject';

export class ForeignLanguageSubject extends Subject {
  private languageCode: string;

  constructor(code: string, name: string, languageCode: string) {
    super(code, name);
    this.languageCode = languageCode;
  }

  getLanguageCode(): string {
    return this.languageCode;
  }
}
