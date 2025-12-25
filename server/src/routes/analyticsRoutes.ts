// src/routes/analyticsRoutes.ts
// Routes untuk Analytics & Dashboard

import { Router } from 'express';
import {
  getDashboardStats,
  getAnalyticsData,
  getRecentActivities,
} from '../controllers/analyticsController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// Semua routes analytics butuh authentication
router.use(authenticate);

router.get('/dashboard', getDashboardStats);
router.get('/data', getAnalyticsData);
router.get('/recent', getRecentActivities);

export default router;