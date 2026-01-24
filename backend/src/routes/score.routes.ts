import { Router } from 'express';
import { getStudentScores } from '../controllers/score.controller';

const router = Router();

router.get('/:sbd', getStudentScores);

export default router;
