// prisma/seed.ts
// File untuk insert dummy data ke database

// @ts-ignore
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Hash password untuk testing
  const hashedPassword = await bcrypt.hash('password123', 10);

  // 1. Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@aicofounder.com' },
    update: {},
    create: {
      email: 'admin@aicofounder.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // 2. Create Regular User
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: hashedPassword,
      name: 'John Doe',
      role: 'USER',
    },
  });
  console.log('✅ Regular user created:', user.email);

  // 3. Create Sample Chat
  const existingChat = await prisma.chat.findFirst({
    where: { userId: user.id },
  });

  if (!existingChat) {
    const chat = await prisma.chat.create({
      data: {
        userId: user.id,
        title: 'Getting Started with AI',
        messages: {
          create: [
            {
              role: 'USER',
              content: 'Hello! How can you help me?',
            },
            {
              role: 'ASSISTANT',
              content: 'Hi! I can help you with business analysis, workflow automation, and data insights. What would you like to work on?',
            },
          ],
        },
      },
    });
    console.log('✅ Sample chat created');
  }

  // 4. Create Sample Workflow
  const existingWorkflow = await prisma.workflow.findFirst({
    where: { userId: user.id },
  });

  if (!existingWorkflow) {
    const workflow = await prisma.workflow.create({
      data: {
        userId: user.id,
        name: 'Daily Sales Report',
        description: 'Automatically generate daily sales reports',
        status: 'ACTIVE',
        config: {
          trigger: 'schedule',
          frequency: 'daily',
          time: '09:00',
        },
      },
    });
    console.log('✅ Sample workflow created');
  }

  // 5. Create Analytics Data
  const existingAnalytics = await prisma.analytics.findFirst({
    where: { userId: user.id },
  });

  if (!existingAnalytics) {
    await prisma.analytics.createMany({
      data: [
        {
          userId: user.id,
          metric: 'chats_created',
          value: 5,
          date: new Date(),
        },
        {
          userId: user.id,
          metric: 'workflows_run',
          value: 12,
          date: new Date(),
        },
        {
          userId: user.id,
          metric: 'api_calls',
          value: 150,
          date: new Date(),
        },
      ],
    });
    console.log('✅ Analytics data created');
  }

  // 6. Create Sample Invoice
  const existingInvoice = await prisma.invoice.findFirst({
    where: { userId: user.id },
  });

  if (!existingInvoice) {
    const invoice = await prisma.invoice.create({
      data: {
        userId: user.id,
        amount: 29.99,
        currency: 'USD',
        status: 'PAID',
        plan: 'pro',
        billingPeriod: 'monthly',
        paidAt: new Date(),
      },
    });
    console.log('✅ Sample invoice created');
  }

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    // @ts-ignore
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });