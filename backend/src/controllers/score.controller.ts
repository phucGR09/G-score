import { Request, Response, NextFunction } from 'express';
import { ScoreService } from '../services/score.service';
import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';
import { StudentScoreMapper } from '../mappers/student-score.mapper';

const scoreService = new ScoreService();

export const getStudentScores = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { sbd } = req.params;

    if (!sbd) {
      throw new ApiError(400, 'Registration number (sbd) is required');
    }

    const studentScore = await scoreService.findStudentByRegistrationNumber(sbd);

    if (!studentScore) {
      throw new ApiError(404, 'Student not found');
    }

    const dto = StudentScoreMapper.toDto(studentScore);

    res.status(200).json(
      new ApiResponse(200, dto, 'Student scores retrieved successfully')
    );
  }
);
