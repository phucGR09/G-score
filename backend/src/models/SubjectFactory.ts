import { CoreSubject } from './CoreSubject';
import { NaturalScienceSubject } from './NaturalScienceSubject';
import { SocialScienceSubject } from './SocialScienceSubject';
import { ForeignLanguageSubject } from './ForeignLanguageSubject';

export class SubjectFactory {
  static createCore(code: string, name: string): CoreSubject {
    return new CoreSubject(code, name);
  }

  static createNaturalScience(code: string, name: string): NaturalScienceSubject {
    return new NaturalScienceSubject(code, name);
  }

  static createSocialScience(code: string, name: string): SocialScienceSubject {
    return new SocialScienceSubject(code, name);
  }

  static createForeignLanguage(code: string, name: string, languageCode: string): ForeignLanguageSubject {
    return new ForeignLanguageSubject(code, name, languageCode);
  }
}
