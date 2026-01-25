import { Request, Response, NextFunction } from 'express';
import { StatisticsService } from '../services/statistics.service';
import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';
import { TopStudentMapper } from '../mappers/top-student.mapper';

const statisticsService = new StatisticsService();

export const getStatistics = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const statistics = await statisticsService.calculateSubjectStatistics();

    res.status(200).json(
      new ApiResponse(200, statistics, 'Statistics retrieved successfully')
    );
  }
);

export const getTopStudents = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { group } = req.query;

    if (group !== 'A') {
      throw new ApiError(400, 'Only group A is currently supported');
    }

    const studentScores = await statisticsService.getTopStudentsGroupA(10);
    const groupA = statisticsService.getGroupA();
    
    const topStudents = studentScores.map(studentScore => 
      TopStudentMapper.toDto(studentScore, groupA)
    );

    res.status(200).json(
      new ApiResponse(200, topStudents, 'Top students retrieved successfully')
    );
  }
);

export const getCountScores = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const countScores = await statisticsService.getScoreCountsByRange();

    res.status(200).json(
      new ApiResponse(200, countScores, 'Score counts retrieved successfully')
    );
  }
);
