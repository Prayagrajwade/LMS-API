import { check } from "express-validator";

export const validateCourse = [
   check('title').notEmpty().withMessage("Title is required"),
   check('description').notEmpty().withMessage("Description is required")
];