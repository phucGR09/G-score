import { StudentScore } from '../models/StudentScore';
import { StudentScoreResponseDto } from '../dtos/response.dto';

export class StudentScoreMapper {
  static toDto(studentScore: StudentScore): StudentScoreResponseDto {
    const student = studentScore.getStudent();
    
    return {
      sbd: student.getSbd(),
      fullName: student.getFullName() || null,
      scores: {
        toan: studentScore.getScore('toan'),
        vat_li: studentScore.getScore('vat_li'),
        hoa_hoc: studentScore.getScore('hoa_hoc'),
        sinh_hoc: studentScore.getScore('sinh_hoc'),
        ngu_van: studentScore.getScore('ngu_van'),
        ngoai_ngu: studentScore.getScore('ngoai_ngu'),
        ma_ngoai_ngu: null,
        lich_su: studentScore.getScore('lich_su'),
        dia_li: studentScore.getScore('dia_li'),
        gdcd: studentScore.getScore('gdcd')
      },
      average: studentScore.getAverage()
    };
  }
}
