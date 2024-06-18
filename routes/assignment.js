import express from 'express';
import { createAssignment, submitAssignment, gradeAssignment } from '../controllers/assignmentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['instructor']), createAssignment);
router.post('/submit', authMiddleware, roleMiddleware(['student']), submitAssignment);
router.post('/grade', authMiddleware, roleMiddleware(['instructor']), gradeAssignment);

export default router;
