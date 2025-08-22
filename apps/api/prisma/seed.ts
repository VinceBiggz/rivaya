import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create demo users
  const demoPassword = await bcrypt.hash('demo123', 10);
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@rivaya.com' },
    update: {},
    create: {
      email: 'demo@rivaya.com',
      fullName: 'Demo User',
      passwordHash: demoPassword,
      role: 'user',
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@rivaya.com' },
    update: {},
    create: {
      email: 'admin@rivaya.com',
      fullName: 'Admin User',
      passwordHash: demoPassword,
      role: 'admin',
    },
  });

  // Create demo groups
  const demoGroup = await prisma.group.upsert({
    where: { id: 'demo-group-1' },
    update: {},
    create: {
      id: 'demo-group-1',
      name: 'RIVAYA Demo Group',
      description: 'A demo group for testing the RIVAYA platform',
      category: 'Technology',
      privacy: 'public',
      ownerId: demoUser.id,
    },
  });

  // Add users to group
  await prisma.groupMember.upsert({
    where: { 
      groupId_userId: {
        groupId: demoGroup.id,
        userId: demoUser.id,
      }
    },
    update: {},
    create: {
      groupId: demoGroup.id,
      userId: demoUser.id,
      role: 'owner',
    },
  });

  await prisma.groupMember.upsert({
    where: { 
      groupId_userId: {
        groupId: demoGroup.id,
        userId: adminUser.id,
      }
    },
    update: {},
    create: {
      groupId: demoGroup.id,
      userId: adminUser.id,
      role: 'admin',
    },
  });

  // Create demo messages
  await prisma.message.createMany({
    skipDuplicates: true,
    data: [
      {
        groupId: demoGroup.id,
        senderId: demoUser.id,
        content: 'Welcome to RIVAYA! This is a demo message.',
        messageType: 'text',
      },
      {
        groupId: demoGroup.id,
        senderId: adminUser.id,
        content: 'Thanks for joining our demo group!',
        messageType: 'text',
      },
    ],
  });

  console.log('✅ Database seeded successfully!');
  console.log('📧 Demo users:');
  console.log(`   - demo@rivaya.com (password: demo123)`);
  console.log(`   - admin@rivaya.com (password: demo123)`);
  console.log('👥 Demo group: RIVAYA Demo Group');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
