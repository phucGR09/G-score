import { StudentScore } from '../models/StudentScore';
import { TopStudentResponseDto } from '../dtos/response.dto';
import { GroupA } from '../models/GroupA';

export class TopStudentMapper {
  static toDto(studentScore: StudentScore, groupA: GroupA): TopStudentResponseDto {
    const student = studentScore.getStudent();
    const total = groupA.calculateTotal(studentScore) || 0;
    
    return {
      sbd: student.getSbd(),
      fullName: student.getFullName() || null,
      toan: studentScore.getScore('toan')!,
      vat_li: studentScore.getScore('vat_li')!,
      hoa_hoc: studentScore.getScore('hoa_hoc')!,
      total
    };
  }
}
