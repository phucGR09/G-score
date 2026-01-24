export interface StudentScoreResponseDto {
  sbd: string;
  fullName: string | null;
  scores: {
    toan: number | null;
    vat_li: number | null;
    hoa_hoc: number | null;
    sinh_hoc: number | null;
    ngu_van: number | null;
    ngoai_ngu: number | null;
    ma_ngoai_ngu: string | null;
    lich_su: number | null;
    dia_li: number | null;
    gdcd: number | null;
  };
  average: number | null;
}

export interface TopStudentResponseDto {
  sbd: string;
  fullName: string | null;
  toan: number;
  vat_li: number;
  hoa_hoc: number;
  total: number;
}

export interface SubjectStatisticsDto {
  [subject: string]: {
    excellent: number;
    good: number;
    average: number;
    poor: number;
  };
}
