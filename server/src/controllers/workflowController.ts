// src/controllers/workflowController.ts
// Controller untuk Workflow management (n8n integration)

import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prismaClient';

// ==========================================
// CREATE WORKFLOW - Buat workflow baru
// ==========================================
export const createWorkflow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { name, description, config } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Workflow name is required',
      });
    }

    const workflow = await prisma.workflow.create({
      data: {
        userId: userId!,
        name,
        description,
        status: 'INACTIVE',
        config: config || {},
      },
    });

    res.status(201).json({
      success: true,
      message: 'Workflow created successfully',
      data: { workflow },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET ALL WORKFLOWS - Ambil semua workflow user
// ==========================================
export const getAllWorkflows = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    const workflows = await prisma.workflow.findMany({
      where: { userId: userId! },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { executions: true },
        },
      },
    });

    res.json({
      success: true,
      data: { workflows },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET WORKFLOW BY ID - Ambil detail workflow
// ==========================================
export const getWorkflowById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { workflowId } = req.params;

    const workflow = await prisma.workflow.findFirst({
      where: {
        id: workflowId,
        userId: userId!,
      },
      include: {
        executions: {
          orderBy: { startedAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!workflow) {
      return res.status(404).json({
        success: false,
        message: 'Workflow not found',
      });
    }

    res.json({
      success: true,
      data: { workflow },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// UPDATE WORKFLOW - Update workflow
// ==========================================
export const updateWorkflow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { workflowId } = req.params;
    const { name, description, config, status } = req.body;

    // Verifikasi workflow milik user
    const workflow = await prisma.workflow.findFirst({
      where: {
        id: workflowId,
        userId: userId!,
      },
    });

    if (!workflow) {
      return res.status(404).json({
        success: false,
        message: 'Workflow not found',
      });
    }

    // Update workflow
    const updatedWorkflow = await prisma.workflow.update({
      where: { id: workflowId },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(config && { config }),
        ...(status && { status }),
      },
    });

    res.json({
      success: true,
      message: 'Workflow updated successfully',
      data: { workflow: updatedWorkflow },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// DELETE WORKFLOW - Hapus workflow
// ==========================================
export const deleteWorkflow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { workflowId } = req.params;

    // Verifikasi workflow milik user
    const workflow = await prisma.workflow.findFirst({
      where: {
        id: workflowId,
        userId: userId!,
      },
    });

    if (!workflow) {
      return res.status(404).json({
        success: false,
        message: 'Workflow not found',
      });
    }

    await prisma.workflow.delete({
      where: { id: workflowId },
    });

    res.json({
      success: true,
      message: 'Workflow deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// EXECUTE WORKFLOW - Jalankan workflow
// ==========================================
export const executeWorkflow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { workflowId } = req.params;
    const { input } = req.body;

    // Verifikasi workflow
    const workflow = await prisma.workflow.findFirst({
      where: {
        id: workflowId,
        userId: userId!,
      },
    });

    if (!workflow) {
      return res.status(404).json({
        success: false,
        message: 'Workflow not found',
      });
    }

    if (workflow.status !== 'ACTIVE') {
      return res.status(400).json({
        success: false,
        message: 'Workflow is not active',
      });
    }

    // Buat execution record
    const execution = await prisma.workflowExecution.create({
      data: {
        workflowId,
        status: 'RUNNING',
      },
    });

    // TODO: Integrasi dengan n8n webhook
    // Untuk sekarang, simulasi eksekusi
    const simulatedResult = {
      success: true,
      message: 'Workflow executed successfully (simulated)',
      input,
      timestamp: new Date().toISOString(),
    };

    // Update execution status
    const completedExecution = await prisma.workflowExecution.update({
      where: { id: execution.id },
      data: {
        status: 'SUCCESS',
        finishedAt: new Date(),
        result: simulatedResult,
      },
    });

    // Track analytics
    await prisma.analytics.create({
      data: {
        userId: userId!,
        metric: 'workflows_executed',
        value: 1,
      },
    });

    res.json({
      success: true,
      message: 'Workflow executed successfully',
      data: { execution: completedExecution },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// TOGGLE WORKFLOW STATUS - Aktifkan/Nonaktifkan
// ==========================================
export const toggleWorkflowStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { workflowId } = req.params;

    // Verifikasi workflow
    const workflow = await prisma.workflow.findFirst({
      where: {
        id: workflowId,
        userId: userId!,
      },
    });

    if (!workflow) {
      return res.status(404).json({
        success: false,
        message: 'Workflow not found',
      });
    }

    // Toggle status
    const newStatus = workflow.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

    const updatedWorkflow = await prisma.workflow.update({
      where: { id: workflowId },
      data: { status: newStatus },
    });

    res.json({
      success: true,
      message: `Workflow ${newStatus.toLowerCase()} successfully`,
      data: { workflow: updatedWorkflow },
    });
  } catch (error) {
    next(error);
  }
};