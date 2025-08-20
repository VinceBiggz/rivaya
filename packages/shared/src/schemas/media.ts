import { z } from 'zod';

// Media Upload Schema
export const mediaUploadSchema = z.object({
  groupId: z.string().uuid('Invalid group ID'),
  file: z.instanceof(File, { message: 'File is required' }),
  metadata: z.object({
    description: z.string().max(500).optional(),
    tags: z.array(z.string().max(50)).max(20).optional(),
    customFields: z.record(z.any()).optional()
  }).optional(),
  privacy: z.object({
    visibility: z.enum(['public', 'group_members', 'selected_members', 'private']).default('group_members'),
    allowedMembers: z.array(z.string().uuid('Invalid user ID')).optional(),
    blockedMembers: z.array(z.string().uuid('Invalid user ID')).optional(),
    allowDownload: z.boolean().default(true),
    allowSharing: z.boolean().default(true),
    watermark: z.boolean().default(false),
    expiresAt: z.date().optional()
  }).optional()
});

// Media Album Schema
export const mediaAlbumSchema = z.object({
  groupId: z.string().uuid('Invalid group ID'),
  name: z.string().min(1, 'Album name is required').max(100, 'Album name must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  coverImageId: z.string().uuid('Invalid media ID').optional(),
  privacy: z.object({
    visibility: z.enum(['public', 'group_members', 'selected_members', 'private']).default('group_members'),
    allowedMembers: z.array(z.string().uuid('Invalid user ID')).optional(),
    blockedMembers: z.array(z.string().uuid('Invalid user ID')).optional(),
    allowDownload: z.boolean().default(true),
    allowSharing: z.boolean().default(true),
    watermark: z.boolean().default(false),
    expiresAt: z.date().optional()
  }).optional(),
  assets: z.array(z.string().uuid('Invalid media ID')).optional(),
  tags: z.array(z.string().max(50)).max(10).optional()
});

// Media Comment Schema
export const mediaCommentSchema = z.object({
  assetId: z.string().uuid('Invalid media ID'),
  content: z.string().min(1, 'Comment content is required').max(1000, 'Comment must be less than 1000 characters'),
  parentId: z.string().uuid('Invalid comment ID').optional()
});

// Media Reaction Schema
export const mediaReactionSchema = z.object({
  assetId: z.string().uuid('Invalid media ID'),
  type: z.enum(['like', 'love', 'laugh', 'wow', 'sad', 'angry', 'heart', 'thumbs_up', 'thumbs_down'])
});

// Media Share Schema
export const mediaShareSchema = z.object({
  assetId: z.string().uuid('Invalid media ID'),
  sharedWith: z.array(z.string().uuid('Invalid user ID')).min(1, 'At least one recipient is required'),
  message: z.string().max(500, 'Message must be less than 500 characters').optional(),
  expiresAt: z.date().optional()
});

// Export types
export type MediaUpload = z.infer<typeof mediaUploadSchema>;
export type MediaAlbum = z.infer<typeof mediaAlbumSchema>;
export type MediaComment = z.infer<typeof mediaCommentSchema>;
export type MediaReaction = z.infer<typeof mediaReactionSchema>;
export type MediaShare = z.infer<typeof mediaShareSchema>;
