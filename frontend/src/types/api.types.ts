export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

export interface StudentScoreResponse {
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

export interface TopStudentResponse {
  sbd: string;
  fullName: string | null;
  toan: number;
  vat_li: number;
  hoa_hoc: number;
  total: number;
}

export interface SubjectStatistics {
  [subject: string]: {
    excellent: number;
    good: number;
    average: number;
    poor: number;
  };
}

export interface CountScoreResponse {
  [subject: string]: number[]; // Array of 11 elements (0-10)
}

export interface CountStudentResponse {
  totalStudents: number;
  invalidStudents: number;
  validStudents: number;
}
