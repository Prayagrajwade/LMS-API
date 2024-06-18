import { check } from "express-validator";

export const assignmentValidator = [
      check('title').notEmpty().withMessage('Title is required'),
      check('description').notEmpty().withMessage('Description is required'),
      check('dueDate').isISO8601().toDate().withMessage('Invalid due date'),
      check('course').notEmpty().withMessage('Course ID is required')
]