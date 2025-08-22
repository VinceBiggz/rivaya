import { z } from 'zod';

export const GroupTypeSchema = z.enum(['family', 'alumni', 'sacco', 'community', 'business']);
export const GroupRoleSchema = z.enum(['admin', 'moderator', 'member']);

export const GroupSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
  type: GroupTypeSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateGroupSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  type: GroupTypeSchema,
});

export const GroupMemberSchema = z.object({
  userId: z.string().uuid(),
  role: GroupRoleSchema,
  joinedAt: z.date(),
});
