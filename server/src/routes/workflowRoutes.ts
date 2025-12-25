// src/routes/workflowRoutes.ts
// Routes untuk Workflow management

import { Router } from 'express';
import {
  createWorkflow,
  getAllWorkflows,
  getWorkflowById,
  updateWorkflow,
  deleteWorkflow,
  executeWorkflow,
  toggleWorkflowStatus,
} from '../controllers/workflowController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// Semua routes workflow butuh authentication
router.use(authenticate);

// Workflow CRUD
router.post('/', createWorkflow);
router.get('/', getAllWorkflows);
router.get('/:workflowId', getWorkflowById);
router.patch('/:workflowId', updateWorkflow);
router.delete('/:workflowId', deleteWorkflow);

// Workflow execution
router.post('/:workflowId/execute', executeWorkflow);
router.patch('/:workflowId/toggle', toggleWorkflowStatus);

export default router;