import { z } from 'zod';

// Pagination Schema
export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

// Search Schema
export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required').max(100, 'Search query must be less than 100 characters'),
  filters: z.record(z.any()).optional(),
  dateRange: z.object({
    start: z.string().datetime('Invalid start date'),
    end: z.string().datetime('Invalid end date')
  }).optional(),
  pagination: paginationSchema.optional()
});

// Filter Schema
export const filterSchema = z.object({
  field: z.string().min(1, 'Field name is required'),
  operator: z.enum(['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'in', 'nin', 'like', 'ilike']),
  value: z.any()
});

// API Request Schema
export const apiRequestSchema = z.object({
  data: z.any().optional(),
  params: z.record(z.any()).optional(),
  query: z.record(z.any()).optional(),
  headers: z.record(z.string()).optional()
});

// API Response Schema
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.any()).optional(),
    stack: z.string().optional()
  }).optional(),
  message: z.string().optional(),
  timestamp: z.string(),
  requestId: z.string()
});

// Paginated Response Schema
export const paginatedResponseSchema = z.object({
  data: z.array(z.any()),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
    nextPage: z.number().optional(),
    prevPage: z.number().optional()
  }),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number()
});

// Webhook Payload Schema
export const webhookPayloadSchema = z.object({
  event: z.string().min(1, 'Event type is required'),
  timestamp: z.string().datetime('Invalid timestamp'),
  data: z.any(),
  signature: z.string().optional()
});

// File Upload Request Schema
export const fileUploadRequestSchema = z.object({
  file: z.instanceof(File, { message: 'File is required' }),
  metadata: z.record(z.any()).optional(),
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

// File Upload Response Schema
export const fileUploadResponseSchema = z.object({
  id: z.string().uuid('Invalid file ID'),
  url: z.string().url('Invalid file URL'),
  filename: z.string().min(1, 'Filename is required'),
  size: z.number().positive('File size must be positive'),
  mimeType: z.string().min(1, 'MIME type is required'),
  uploadedAt: z.string().datetime('Invalid upload timestamp')
});

// Notification Request Schema
export const notificationRequestSchema = z.object({
  type: z.string().min(1, 'Notification type is required'),
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  message: z.string().min(1, 'Message is required').max(1000, 'Message must be less than 1000 characters'),
  recipients: z.array(z.string().uuid('Invalid user ID')).min(1, 'At least one recipient is required'),
  data: z.record(z.any()).optional(),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).default('normal'),
  scheduledAt: z.string().datetime('Invalid scheduled timestamp').optional()
});

// Analytics Request Schema
export const analyticsRequestSchema = z.object({
  groupId: z.string().uuid('Invalid group ID'),
  period: z.string().regex(/^\d{4}-\d{2}$/, 'Period must be in YYYY-MM format'),
  metrics: z.array(z.string().min(1, 'Metric name is required')).min(1, 'At least one metric is required'),
  filters: z.record(z.any()).optional()
});

// Export types
export type Pagination = z.infer<typeof paginationSchema>;
export type Search = z.infer<typeof searchSchema>;
export type Filter = z.infer<typeof filterSchema>;
export type ApiRequest = z.infer<typeof apiRequestSchema>;
export type ApiResponse = z.infer<typeof apiResponseSchema>;
export type PaginatedResponse = z.infer<typeof paginatedResponseSchema>;
export type WebhookPayload = z.infer<typeof webhookPayloadSchema>;
export type FileUploadRequest = z.infer<typeof fileUploadRequestSchema>;
export type FileUploadResponse = z.infer<typeof fileUploadResponseSchema>;
export type NotificationRequest = z.infer<typeof notificationRequestSchema>;
export type AnalyticsRequest = z.infer<typeof analyticsRequestSchema>;
