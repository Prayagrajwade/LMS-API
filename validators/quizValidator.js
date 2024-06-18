import { check } from "express-validator";


exports.validateQuiz = [
  check('title').notEmpty().withMessage('Title is required'),
  check('description').notEmpty().withMessage('Description is required'),
  check('course').notEmpty().withMessage('Course ID is required'),
  check('questions').isArray().withMessage('Questions must be an array')
];
