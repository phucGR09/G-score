import { Router } from 'express';
import { getStatistics, getTopStudents } from '../controllers/statistics.controller';

export const statisticsRouter = Router();
statisticsRouter.get('/', getStatistics);

export const topStudentsRouter = Router();
topStudentsRouter.get('/', getTopStudents);
