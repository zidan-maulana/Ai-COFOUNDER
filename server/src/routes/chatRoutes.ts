// src/routes/chatRoutes.ts
// Routes untuk Chat feature

import { Router } from 'express';
import {
  createChat,
  getAllChats,
  getChatById,
  sendMessage,
  deleteChat,
  updateChatTitle,
} from '../controllers/chatController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// Semua routes chat butuh authentication
router.use(authenticate);

// Chat CRUD
router.post('/', createChat);
router.get('/', getAllChats);
router.get('/:chatId', getChatById);
router.delete('/:chatId', deleteChat);
router.patch('/:chatId/title', updateChatTitle);

// Send message
router.post('/:chatId/message', sendMessage);

export default router;