// src/routes/billingRoutes.ts
// Routes untuk Billing & Subscription

import { Router } from 'express';
import {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  payInvoice,
  getSubscriptionInfo,
} from '../controllers/billingController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// Semua routes billing butuh authentication
router.use(authenticate);

// Invoice management
router.get('/invoices', getAllInvoices);
router.get('/invoices/:invoiceId', getInvoiceById);
router.post('/invoices', createInvoice);
router.post('/invoices/:invoiceId/pay', payInvoice);

// Subscription info
router.get('/subscription', getSubscriptionInfo);

export default router;