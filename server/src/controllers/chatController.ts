// src/controllers/chatController.ts
// Controller untuk AI Chat feature

import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prismaClient';

// ==========================================
// CREATE CHAT - Buat chat baru
// ==========================================
export const createChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { title } = req.body;

    const chat = await prisma.chat.create({
      data: {
        userId: userId!,
        title: title || 'New Chat',
      },
    });

    res.status(201).json({
      success: true,
      message: 'Chat created successfully',
      data: { chat },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET ALL CHATS - Ambil semua chat user
// ==========================================
export const getAllChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    const chats = await prisma.chat.findMany({
      where: { userId: userId! },
      orderBy: { updatedAt: 'desc' },
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { messages: true },
        },
      },
    });

    res.json({
      success: true,
      data: { chats },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET CHAT BY ID - Ambil detail chat
// ==========================================
export const getChatById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { chatId } = req.params;

    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userId: userId!,
      },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found',
      });
    }

    res.json({
      success: true,
      data: { chat },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// SEND MESSAGE - Kirim pesan ke AI
// ==========================================
export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { chatId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Message content is required',
      });
    }

    // Verifikasi chat milik user
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userId: userId!,
      },
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found',
      });
    }

    // Simpan pesan user
    const userMessage = await prisma.message.create({
      data: {
        chatId,
        role: 'USER',
        content,
      },
    });

    // TODO: Integrasi dengan AI API (OpenAI, Claude, dll)
    // Untuk sekarang, kita pakai dummy response
    const aiResponse = `This is a dummy AI response to: "${content}". Integration with real AI API (OpenAI/Claude) will be added later.`;

    // Simpan response AI
    const assistantMessage = await prisma.message.create({
      data: {
        chatId,
        role: 'ASSISTANT',
        content: aiResponse,
      },
    });

    // Update chat timestamp
    await prisma.chat.update({
      where: { id: chatId },
      data: { updatedAt: new Date() },
    });

    // Track analytics
    await prisma.analytics.create({
      data: {
        userId: userId!,
        metric: 'messages_sent',
        value: 1,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: {
        userMessage,
        assistantMessage,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// DELETE CHAT - Hapus chat
// ==========================================
export const deleteChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { chatId } = req.params;

    // Verifikasi chat milik user
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userId: userId!,
      },
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found',
      });
    }

    // Hapus chat (messages akan terhapus otomatis karena cascade)
    await prisma.chat.delete({
      where: { id: chatId },
    });

    res.json({
      success: true,
      message: 'Chat deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// UPDATE CHAT TITLE - Ubah judul chat
// ==========================================
export const updateChatTitle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { chatId } = req.params;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required',
      });
    }

    // Verifikasi chat milik user
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userId: userId!,
      },
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found',
      });
    }

    // Update title
    const updatedChat = await prisma.chat.update({
      where: { id: chatId },
      data: { title },
    });

    res.json({
      success: true,
      message: 'Chat title updated successfully',
      data: { chat: updatedChat },
    });
  } catch (error) {
    next(error);
  }
};