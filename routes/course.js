import express from "express"
const router = express.Router();
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createCource, getCourses , getCoursesById , approveCourse} from "../controllers/courseController.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { validateCourse } from "../validators/courseValidator.js";

router.post('/',authMiddleware,roleMiddleware(['instructor']),validateCourse,createCource);
router.get('/',authMiddleware,getCourses);
router.get('/:id',authMiddleware,getCoursesById);
router.post('/:id/approve', authMiddleware, roleMiddleware(['admin']), approveCourse);

export default router;