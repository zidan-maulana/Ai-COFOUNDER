// src/controllers/analyticsController.ts
// Controller untuk Analytics & Dashboard stats

import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prismaClient';

// ==========================================
// GET DASHBOARD STATS - Overview statistics
// ==========================================
export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    // Count total chats
    const totalChats = await prisma.chat.count({
      where: { userId: userId! },
    });

    // Count total messages
    const totalMessages = await prisma.message.count({
      where: {
        chat: {
          userId: userId!,
        },
      },
    });

    // Count total workflows
    const totalWorkflows = await prisma.workflow.count({
      where: { userId: userId! },
    });

    // Count active workflows
    const activeWorkflows = await prisma.workflow.count({
      where: {
        userId: userId!,
        status: 'ACTIVE',
      },
    });

    // Count total workflow executions
    const totalExecutions = await prisma.workflowExecution.count({
      where: {
        workflow: {
          userId: userId!,
        },
      },
    });

    // Count successful executions
    const successfulExecutions = await prisma.workflowExecution.count({
      where: {
        workflow: {
          userId: userId!,
        },
        status: 'SUCCESS',
      },
    });

    res.json({
      success: true,
      data: {
        stats: {
          totalChats,
          totalMessages,
          totalWorkflows,
          activeWorkflows,
          totalExecutions,
          successfulExecutions,
          successRate: totalExecutions > 0 
            ? Math.round((successfulExecutions / totalExecutions) * 100) 
            : 0,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET ANALYTICS DATA - Time series data
// ==========================================
export const getAnalyticsData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { metric, days = 7 } = req.query;

    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - Number(days));

    const where: any = {
      userId: userId!,
      date: {
        gte: daysAgo,
      },
    };

    if (metric) {
      where.metric = metric;
    }

    const analytics = await prisma.analytics.findMany({
      where,
      orderBy: { date: 'asc' },
    });

    res.json({
      success: true,
      data: { analytics },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET RECENT ACTIVITIES - Latest user actions
// ==========================================
export const getRecentActivities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { limit = 10 } = req.query;

    // Get recent chats
    const recentChats = await prisma.chat.findMany({
      where: { userId: userId! },
      orderBy: { updatedAt: 'desc' },
      take: Number(limit),
      select: {
        id: true,
        title: true,
        updatedAt: true,
      },
    });

    // Get recent workflow executions
    const recentExecutions = await prisma.workflowExecution.findMany({
      where: {
        workflow: {
          userId: userId!,
        },
      },
      orderBy: { startedAt: 'desc' },
      take: Number(limit),
      include: {
        workflow: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: {
        recentChats,
        recentExecutions,
      },
    });
  } catch (error) {
    next(error);
  }
};