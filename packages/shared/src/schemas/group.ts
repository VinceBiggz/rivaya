import { z } from 'zod';

// Group Creation Schema
export const groupCreationSchema = z.object({
  name: z.string().min(1, 'Group name is required').max(100, 'Group name must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  type: z.enum(['family', 'alumni', 'sacco', 'friends', 'business', 'community']),
  category: z.enum(['immediate_family', 'extended_family', 'high_school', 'university', 'workplace', 'church', 'neighborhood', 'hobby', 'other']),
  isPublic: z.boolean().default(false),
  settings: z.object({
    membership: z.object({
      approvalRequired: z.boolean().default(true),
      allowInvitations: z.boolean().default(true),
      maxMembers: z.number().min(1).max(10000).optional(),
      allowGuestAccess: z.boolean().default(false)
    }),
    contributions: z.object({
      enabled: z.boolean().default(false),
      currency: z.string().default('USD'),
      frequency: z.enum(['monthly', 'quarterly', 'yearly', 'custom']).default('monthly'),
      autoReminders: z.boolean().default(true),
      lateFees: z.boolean().default(false),
      lateFeeAmount: z.number().min(0).optional()
    }),
    events: z.object({
      allowMemberEvents: z.boolean().default(true),
      requireApproval: z.boolean().default(false),
      maxEventDuration: z.number().min(1).max(365).optional()
    }),
    privacy: z.object({
      memberListVisibility: z.enum(['public', 'members_only', 'admins_only']).default('members_only'),
      activityVisibility: z.enum(['public', 'members_only', 'admins_only']).default('members_only'),
      allowExternalSharing: z.boolean().default(false)
    }),
    notifications: z.object({
      emailDigest: z.boolean().default(true),
      digestFrequency: z.enum(['daily', 'weekly', 'monthly']).default('weekly'),
      pushNotifications: z.boolean().default(true),
      smsNotifications: z.boolean().default(false)
    })
  }).optional(),
  location: z.object({
    country: z.string().min(1, 'Country is required'),
    region: z.string().optional(),
    city: z.string().optional(),
    coordinates: z.tuple([z.number(), z.number()]).optional()
  }).optional(),
  tags: z.array(z.string().max(50)).max(10).optional()
});

// Group Update Schema
export const groupUpdateSchema = groupCreationSchema.partial();

// Group Member Schema
export const groupMemberSchema = z.object({
  groupId: z.string().uuid('Invalid group ID'),
  userId: z.string().uuid('Invalid user ID'),
  role: z.enum(['admin', 'treasurer', 'secretary', 'member']).default('member'),
  contributionTier: z.string().uuid('Invalid contribution tier ID').optional(),
  householdId: z.string().uuid('Invalid household ID').optional()
});

// Group Invitation Schema
export const groupInvitationSchema = z.object({
  groupId: z.string().uuid('Invalid group ID'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'treasurer', 'secretary', 'member']).default('member'),
  message: z.string().max(500, 'Message must be less than 500 characters').optional()
});

// Contribution Tier Schema
export const contributionTierSchema = z.object({
  groupId: z.string().uuid('Invalid group ID'),
  name: z.string().min(1, 'Tier name is required').max(100, 'Tier name must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  amount: z.number().min(0, 'Amount must be non-negative'),
  currency: z.string().min(3, 'Currency code is required').max(3, 'Currency code must be 3 characters'),
  frequency: z.enum(['monthly', 'quarterly', 'yearly', 'custom']),
  isDefault: z.boolean().default(false),
  maxMembers: z.number().min(1).optional(),
  benefits: z.array(z.string().max(200)).optional()
});

// Household Schema
export const householdSchema = z.object({
  groupId: z.string().uuid('Invalid group ID'),
  name: z.string().min(1, 'Household name is required').max(100, 'Household name must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  headOfHousehold: z.string().uuid('Invalid user ID'),
  members: z.array(z.string().uuid('Invalid user ID')).min(1, 'At least one member is required'),
  contributionTier: z.string().uuid('Invalid contribution tier ID').optional()
});

// Group Search Schema
export const groupSearchSchema = z.object({
  query: z.string().min(1, 'Search query is required').max(100, 'Search query must be less than 100 characters'),
  type: z.enum(['family', 'alumni', 'sacco', 'friends', 'business', 'community']).optional(),
  category: z.enum(['immediate_family', 'extended_family', 'high_school', 'university', 'workplace', 'church', 'neighborhood', 'hobby', 'other']).optional(),
  location: z.object({
    country: z.string().optional(),
    region: z.string().optional(),
    city: z.string().optional()
  }).optional(),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20)
});

// Group Analytics Schema
export const groupAnalyticsSchema = z.object({
  groupId: z.string().uuid('Invalid group ID'),
  period: z.string().regex(/^\d{4}-\d{2}$/, 'Period must be in YYYY-MM format'),
  metrics: z.array(z.enum(['members', 'contributions', 'events', 'activity', 'engagement'])).min(1, 'At least one metric is required')
});

// Export types
export type GroupCreation = z.infer<typeof groupCreationSchema>;
export type GroupUpdate = z.infer<typeof groupUpdateSchema>;
export type GroupMember = z.infer<typeof groupMemberSchema>;
export type GroupInvitation = z.infer<typeof groupInvitationSchema>;
export type ContributionTier = z.infer<typeof contributionTierSchema>;
export type Household = z.infer<typeof householdSchema>;
export type GroupSearch = z.infer<typeof groupSearchSchema>;
export type GroupAnalytics = z.infer<typeof groupAnalyticsSchema>;
