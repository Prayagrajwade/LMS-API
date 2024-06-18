import express from 'express';

const router = express.Router();

import { authMiddleware } from '../middleware/authMiddleware.js';

import { getUserProfile , updateUserProfile } from '../controllers/userController.js';

router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);

export default router;