import express from 'express';
import {registerValidation , loginValidation} from '../validators/authValidator.js';
import { register , login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register',registerValidation,register);
router.post('/login',loginValidation,login);

export default router;
