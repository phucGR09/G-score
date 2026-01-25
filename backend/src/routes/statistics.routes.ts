import { Router } from 'express';
import { getStatistics, getTopStudents, getCountScores } from '../controllers/statistics.controller';

export const statisticsRouter = Router();
statisticsRouter.get('/', getStatistics);

export const topStudentsRouter = Router();
topStudentsRouter.get('/', getTopStudents);

export const countScoresRouter = Router();
countScoresRouter.get('/', getCountScores);
