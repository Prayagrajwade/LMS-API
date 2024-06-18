import express from 'express';
import {createQuiz,submitQuiz,getQuizById} from '../controllers/quizController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['instructor']), createQuiz);
router.post('/submit', authMiddleware, roleMiddleware(['student']), submitQuiz);
router.get('/:id', authMiddleware, getQuizById);

export default router;
