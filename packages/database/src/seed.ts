import { prisma } from './client';
import type { SeedResult } from './types';

export async function seedDatabase(): Promise<SeedResult> {
  try {
    let recordsCreated = 0;

    // Create sample data
    const sampleProfile = await prisma.profile.create({
      data: {
        email: 'admin@rivaya.com',
        firstName: 'Admin',
        lastName: 'User',
        isVerified: true,
        isActive: true,
      },
    });
    recordsCreated++;

    const sampleGroup = await prisma.group.create({
      data: {
        name: 'RIVAYA Demo Group',
        description: 'A demonstration group for the RIVAYA platform',
        type: 'social',
        isPublic: true,
        isActive: true,
      },
    });
    recordsCreated++;

    // Add admin user to the group
    await prisma.groupMember.create({
      data: {
        groupId: sampleGroup.id,
        profileId: sampleProfile.id,
        role: 'admin',
      },
    });
    recordsCreated++;

    return {
      success: true,
      recordsCreated,
      message: 'Database seeded successfully',
    };
  } catch (error) {
    return {
      success: false,
      recordsCreated: 0,
      message: `Seeding failed: ${error.message}`,
    };
  }
}
