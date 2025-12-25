// src/routes/authRoutes.ts
// Routes untuk authentication

import { Router } from 'express';
import {
  register,
  login,
  refreshAccessToken,
  logout,
  getProfile,
} from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshAccessToken);
router.post('/logout', logout);

// Protected routes
router.get('/profile', authenticate, getProfile);

export default router;