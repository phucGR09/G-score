import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SCORE_THRESHOLDS = {
  EXCELLENT: 8,
  GOOD: 6,
  AVERAGE: 4
} as const;

export interface SubjectStatsRow {
  subject: string;
  excellent: bigint;
  good: bigint;
  average: bigint;
  poor: bigint;
}

export interface TopStudentRow {
  sbd: string;
  full_name: string | null;
  toan: number;
  vat_li: number;
  hoa_hoc: number;
  total: number;
}

export interface ScoreCountRow {
  subject: string;
  score_range: number;
  count: bigint;
}

export class StatisticsRepository {
  async getSubjectStatistics(): Promise<SubjectStatsRow[]> {
    return await prisma.$queryRaw<SubjectStatsRow[]>`
      SELECT 'toan' as subject,
        COUNT(CASE WHEN toan >= ${SCORE_THRESHOLDS.EXCELLENT} THEN 1 END) as excellent,
        COUNT(CASE WHEN toan >= ${SCORE_THRESHOLDS.GOOD} AND toan < ${SCORE_THRESHOLDS.EXCELLENT} THEN 1 END) as good,
        COUNT(CASE WHEN toan >= ${SCORE_THRESHOLDS.AVERAGE} AND toan < ${SCORE_THRESHOLDS.GOOD} THEN 1 END) as average,
        COUNT(CASE WHEN toan < ${SCORE_THRESHOLDS.AVERAGE} THEN 1 END) as poor
      FROM students WHERE toan IS NOT NULL
      UNION ALL
      SELECT 'ngu_van' as subject,
        COUNT(CASE WHEN ngu_van >= ${SCORE_THRESHOLDS.EXCELLENT} THEN 1 END),
        COUNT(CASE WHEN ngu_van >= ${SCORE_THRESHOLDS.GOOD} AND ngu_van < ${SCORE_THRESHOLDS.EXCELLENT} THEN 1 END),
        COUNT(CASE WHEN ngu_van >= ${SCORE_THRESHOLDS.AVERAGE} AND ngu_van < ${SCORE_THRESHOLDS.GOOD} THEN 1 END),
        COUNT(CASE WHEN ngu_van < ${SCORE_THRESHOLDS.AVERAGE} THEN 1 END)
      FROM students WHERE ngu_van IS NOT NULL
      UNION ALL
      SELECT 'vat_li' as subject,
        COUNT(CASE WHEN vat_li >= ${SCORE_THRESHOLDS.EXCELLENT} THEN 1 END),
        COUNT(CASE WHEN vat_li >= ${SCORE_THRESHOLDS.GOOD} AND vat_li < ${SCORE_THRESHOLDS.EXCELLENT} THEN 1 END),
        COUNT(CASE WHEN vat_li >= ${SCORE_THRESHOLDS.AVERAGE} AND vat_li < ${SCORE_THRESHOLDS.GOOD} THEN 1 END),
        COUNT(CASE WHEN vat_li < ${SCORE_THRESHOLDS.AVERAGE} THEN 1 END)
      FROM students WHERE vat_li IS NOT NULL
      UNION ALL
      SELECT 'hoa_hoc' as subject,
        COUNT(CASE WHEN hoa_hoc >= ${SCORE_THRESHOLDS.EXCELLENT} THEN 1 END),
        COUNT(CASE WHEN hoa_hoc >= ${SCORE_THRESHOLDS.GOOD} AND hoa_hoc < ${SCORE_THRESHOLDS.EXCELLENT} THEN 1 END),
        COUNT(CASE WHEN hoa_hoc >= ${SCORE_THRESHOLDS.AVERAGE} AND hoa_hoc < ${SCORE_THRESHOLDS.GOOD} THEN 1 END),
        COUNT(CASE WHEN hoa_hoc < ${SCORE_THRESHOLDS.AVERAGE} THEN 1 END)
      FROM students WHERE hoa_hoc IS NOT NULL
      UNION ALL
      SELECT 'sinh_hoc' as subject,
        COUNT(CASE WHEN sinh_hoc >= ${SCORE_THRESHOLDS.EXCELLENT} THEN 1 END),
        COUNT(CASE WHEN sinh_hoc >= ${SCORE_THRESHOLDS.GOOD} AND sinh_hoc < ${SCORE_THRESHOLDS.EXCELLENT} THEN 1 END),
        COUNT(CASE WHEN sinh_hoc >= ${SCORE_THRESHOLDS.AVERAGE} AND sinh_hoc < ${SCORE_THRESHOLDS.GOOD} THEN 1 END),
        COUNT(CASE WHEN sinh_hoc < ${SCORE_THRESHOLDS.AVERAGE} THEN 1 END)
      FROM students WHERE sinh_hoc IS NOT NULL
      UNION ALL
      SELECT 'lich_su' as subject,
        COUNT(CASE WHEN lich_su >= ${SCORE_THRESHOLDS.EXCELLENT} THEN 1 END),
        COUNT(CASE WHEN lich_su >= ${SCORE_THRESHOLDS.GOOD} AND lich_su < ${SCORE_THRESHOLDS.EXCELLENT} THEN 1 END),
        COUNT(CASE WHEN lich_su >= ${SCORE_THRESHOLDS.AVERAGE} AND lich_su < ${SCORE_THRESHOLDS.GOOD} THEN 1 END),
        COUNT(CASE WHEN lich_su < ${SCORE_THRESHOLDS.AVERAGE} THEN 1 END)
      FROM students WHERE lich_su IS NOT NULL
      UNION ALL
      SELECT 'dia_li' as subject,
        COUNT(CASE WHEN dia_li >= ${SCORE_THRESHOLDS.EXCELLENT} THEN 1 END),
        COUNT(CASE WHEN dia_li >= ${SCORE_THRESHOLDS.GOOD} AND dia_li < ${SCORE_THRESHOLDS.EXCELLENT} THEN 1 END),
        COUNT(CASE WHEN dia_li >= ${SCORE_THRESHOLDS.AVERAGE} AND dia_li < ${SCORE_THRESHOLDS.GOOD} THEN 1 END),
        COUNT(CASE WHEN dia_li < ${SCORE_THRESHOLDS.AVERAGE} THEN 1 END)
      FROM students WHERE dia_li IS NOT NULL
      UNION ALL
      SELECT 'gdcd' as subject,
        COUNT(CASE WHEN gdcd >= ${SCORE_THRESHOLDS.EXCELLENT} THEN 1 END),
        COUNT(CASE WHEN gdcd >= ${SCORE_THRESHOLDS.GOOD} AND gdcd < ${SCORE_THRESHOLDS.EXCELLENT} THEN 1 END),
        COUNT(CASE WHEN gdcd >= ${SCORE_THRESHOLDS.AVERAGE} AND gdcd < ${SCORE_THRESHOLDS.GOOD} THEN 1 END),
        COUNT(CASE WHEN gdcd < ${SCORE_THRESHOLDS.AVERAGE} THEN 1 END)
      FROM students WHERE gdcd IS NOT NULL
      UNION ALL
      SELECT 'ngoai_ngu' as subject,
        COUNT(CASE WHEN ngoai_ngu >= ${SCORE_THRESHOLDS.EXCELLENT} THEN 1 END),
        COUNT(CASE WHEN ngoai_ngu >= ${SCORE_THRESHOLDS.GOOD} AND ngoai_ngu < ${SCORE_THRESHOLDS.EXCELLENT} THEN 1 END),
        COUNT(CASE WHEN ngoai_ngu >= ${SCORE_THRESHOLDS.AVERAGE} AND ngoai_ngu < ${SCORE_THRESHOLDS.GOOD} THEN 1 END),
        COUNT(CASE WHEN ngoai_ngu < ${SCORE_THRESHOLDS.AVERAGE} THEN 1 END)
      FROM students WHERE ngoai_ngu IS NOT NULL
    `;
  }

  async findTopStudentsByGroupA(limit: number): Promise<TopStudentRow[]> {
    return await prisma.$queryRaw<TopStudentRow[]>`
      SELECT 
        sbd,
        full_name,
        toan,
        vat_li,
        hoa_hoc,
        (toan + vat_li + hoa_hoc) as total
      FROM students
      WHERE toan IS NOT NULL 
        AND vat_li IS NOT NULL 
        AND hoa_hoc IS NOT NULL
      ORDER BY total DESC
      LIMIT ${limit}
    `;
  }

  async getScoreCountsByRange(): Promise<ScoreCountRow[]> {
    return await prisma.$queryRaw<ScoreCountRow[]>`
      WITH score_ranges AS (
        SELECT generate_series(0, 10) as score_range
      ),
      subject_scores AS (
        SELECT 'toan' as subject, toan as score FROM students WHERE toan IS NOT NULL
        UNION ALL
        SELECT 'ngu_van' as subject, ngu_van as score FROM students WHERE ngu_van IS NOT NULL
        UNION ALL
        SELECT 'vat_li' as subject, vat_li as score FROM students WHERE vat_li IS NOT NULL
        UNION ALL
        SELECT 'hoa_hoc' as subject, hoa_hoc as score FROM students WHERE hoa_hoc IS NOT NULL
        UNION ALL
        SELECT 'sinh_hoc' as subject, sinh_hoc as score FROM students WHERE sinh_hoc IS NOT NULL
        UNION ALL
        SELECT 'ngoai_ngu' as subject, ngoai_ngu as score FROM students WHERE ngoai_ngu IS NOT NULL
        UNION ALL
        SELECT 'lich_su' as subject, lich_su as score FROM students WHERE lich_su IS NOT NULL
        UNION ALL
        SELECT 'dia_li' as subject, dia_li as score FROM students WHERE dia_li IS NOT NULL
        UNION ALL
        SELECT 'gdcd' as subject, gdcd as score FROM students WHERE gdcd IS NOT NULL
      )
      SELECT 
        ss.subject,
        sr.score_range,
        COUNT(CASE 
          WHEN sr.score_range = 10 THEN 
            CASE WHEN ss.score = 10 THEN 1 END
          ELSE 
            CASE WHEN ss.score >= sr.score_range AND ss.score < sr.score_range + 1 THEN 1 END
        END) as count
      FROM 
        (SELECT DISTINCT subject FROM subject_scores) subjects
      CROSS JOIN score_ranges sr
      LEFT JOIN subject_scores ss ON subjects.subject = ss.subject
      GROUP BY ss.subject, sr.score_range
      ORDER BY ss.subject, sr.score_range
    `;
  }
}
