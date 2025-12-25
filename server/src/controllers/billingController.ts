// src/controllers/billingController.ts
// Controller untuk Billing & Subscription management

import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prismaClient';

// ==========================================
// GET ALL INVOICES - Ambil semua invoice user
// ==========================================
export const getAllInvoices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    const invoices = await prisma.invoice.findMany({
      where: { userId: userId! },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: { invoices },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET INVOICE BY ID - Detail invoice
// ==========================================
export const getInvoiceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { invoiceId } = req.params;

    const invoice = await prisma.invoice.findFirst({
      where: {
        id: invoiceId,
        userId: userId!,
      },
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found',
      });
    }

    res.json({
      success: true,
      data: { invoice },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// CREATE INVOICE - Buat invoice baru
// ==========================================
export const createInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { amount, plan, billingPeriod } = req.body;

    if (!amount || !plan) {
      return res.status(400).json({
        success: false,
        message: 'Amount and plan are required',
      });
    }

    const invoice = await prisma.invoice.create({
      data: {
        userId: userId!,
        amount: parseFloat(amount),
        currency: 'USD',
        status: 'PENDING',
        plan,
        billingPeriod: billingPeriod || 'monthly',
      },
    });

    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      data: { invoice },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// PAY INVOICE - Bayar invoice (simulasi)
// ==========================================
export const payInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { invoiceId } = req.params;
    const { paymentMethod } = req.body;

    // Verifikasi invoice
    const invoice = await prisma.invoice.findFirst({
      where: {
        id: invoiceId,
        userId: userId!,
      },
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found',
      });
    }

    if (invoice.status === 'PAID') {
      return res.status(400).json({
        success: false,
        message: 'Invoice already paid',
      });
    }

    // TODO: Integrasi dengan payment gateway (Stripe, PayPal, dll)
    // Untuk sekarang, simulasi pembayaran sukses

    const paidInvoice = await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        status: 'PAID',
        paidAt: new Date(),
      },
    });

    res.json({
      success: true,
      message: 'Payment successful',
      data: { invoice: paidInvoice },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET SUBSCRIPTION INFO - Info langganan user
// ==========================================
export const getSubscriptionInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    // Ambil invoice terakhir yang dibayar
    const latestPaidInvoice = await prisma.invoice.findFirst({
      where: {
        userId: userId!,
        status: 'PAID',
      },
      orderBy: { paidAt: 'desc' },
    });

    // Hitung total spent
    const totalSpent = await prisma.invoice.aggregate({
      where: {
        userId: userId!,
        status: 'PAID',
      },
      _sum: {
        amount: true,
      },
    });

    const subscriptionInfo = {
      currentPlan: latestPaidInvoice?.plan || 'free',
      billingPeriod: latestPaidInvoice?.billingPeriod || 'monthly',
      lastPayment: latestPaidInvoice?.paidAt || null,
      totalSpent: totalSpent._sum.amount || 0,
    };

    res.json({
      success: true,
      data: { subscription: subscriptionInfo },
    });
  } catch (error) {
    next(error);
  }
};