import { z } from 'zod';

// Common validation schemas
export const idSchema = z.string().uuid('Invalid ID format');
export const emailSchema = z.string().email('Invalid email address');
export const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format');
export const urlSchema = z.string().url('Invalid URL format');
export const currencySchema = z.string().length(3, 'Currency code must be 3 characters');
export const languageSchema = z.string().length(2, 'Language code must be 2 characters');
export const timezoneSchema = z.string().min(1, 'Timezone is required');

// Status schemas
export const statusSchema = z.enum(['active', 'inactive', 'pending', 'suspended', 'deleted']);
export const prioritySchema = z.enum(['low', 'medium', 'high', 'urgent']);
export const visibilitySchema = z.enum(['public', 'private', 'group_members', 'selected_members']);

// Pagination schema
export const paginationOptionsSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
  total: z.number().min(0).default(0),
  totalPages: z.number().min(0).default(0)
});

// Sort options schema
export const sortOptionsSchema = z.object({
  field: z.string().min(1, 'Sort field is required'),
  direction: z.enum(['asc', 'desc']).default('desc')
});

// Filter options schema
export const filterOptionsSchema = z.object({
  field: z.string().min(1, 'Filter field is required'),
  operator: z.enum(['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'in', 'nin', 'like', 'ilike']),
  value: z.any()
});

// Search options schema
export const searchOptionsSchema = z.object({
  query: z.string().min(1, 'Search query is required').max(100, 'Search query must be less than 100 characters'),
  fields: z.array(z.string().min(1, 'Search field is required')).min(1, 'At least one search field is required'),
  filters: z.array(filterOptionsSchema).optional(),
  sort: sortOptionsSchema.optional(),
  pagination: paginationOptionsSchema.optional()
});

// Date range schema
export const dateRangeSchema = z.object({
  start: z.date(),
  end: z.date()
}).refine(data => data.end >= data.start, {
  message: 'End date must be after or equal to start date',
  path: ['end']
});

// File validation schemas
export const fileSizeSchema = z.object({
  maxSize: z.number().positive('Maximum file size must be positive'),
  unit: z.enum(['B', 'KB', 'MB', 'GB']).default('MB')
});

export const fileTypeSchema = z.object({
  allowedTypes: z.array(z.string().min(1, 'File type is required')).min(1, 'At least one file type is required'),
  maxFiles: z.number().positive('Maximum number of files must be positive').optional()
});

// Location schema
export const locationSchema = z.object({
  country: z.string().min(1, 'Country is required'),
  region: z.string().optional(),
  city: z.string().optional(),
  coordinates: z.tuple([z.number(), z.number()]).optional()
});

// Social links schema
export const socialLinksSchema = z.object({
  facebook: z.string().url('Invalid Facebook URL').optional(),
  twitter: z.string().url('Invalid Twitter URL').optional(),
  linkedin: z.string().url('Invalid LinkedIn URL').optional(),
  instagram: z.string().url('Invalid Instagram URL').optional(),
  youtube: z.string().url('Invalid YouTube URL').optional(),
  website: z.string().url('Invalid website URL').optional()
});

// Address schema
export const addressSchema = z.object({
  line1: z.string().min(1, 'Address line 1 is required'),
  line2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required')
});

// Contact information schema
export const contactInfoSchema = z.object({
  email: emailSchema,
  phone: phoneSchema.optional(),
  address: addressSchema.optional(),
  website: urlSchema.optional(),
  socialLinks: socialLinksSchema.optional()
});

// Metadata schema
export const metadataSchema = z.record(z.any()).optional();

// Timestamps schema
export const timestampsSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional()
});

// Audit schema
export const auditSchema = z.object({
  createdBy: z.string().uuid('Invalid user ID'),
  updatedBy: z.string().uuid('Invalid user ID').optional(),
  deletedBy: z.string().uuid('Invalid user ID').optional()
});

// Export types
export type Id = z.infer<typeof idSchema>;
export type Email = z.infer<typeof emailSchema>;
export type Phone = z.infer<typeof phoneSchema>;
export type URL = z.infer<typeof urlSchema>;
export type Currency = z.infer<typeof currencySchema>;
export type Language = z.infer<typeof languageSchema>;
export type Timezone = z.infer<typeof timezoneSchema>;
export type Status = z.infer<typeof statusSchema>;
export type Priority = z.infer<typeof prioritySchema>;
export type Visibility = z.infer<typeof visibilitySchema>;
export type PaginationOptions = z.infer<typeof paginationOptionsSchema>;
export type SortOptions = z.infer<typeof sortOptionsSchema>;
export type FilterOptions = z.infer<typeof filterOptionsSchema>;
export type SearchOptions = z.infer<typeof searchOptionsSchema>;
export type DateRange = z.infer<typeof dateRangeSchema>;
export type FileSize = z.infer<typeof fileSizeSchema>;
export type FileType = z.infer<typeof fileTypeSchema>;
export type Location = z.infer<typeof locationSchema>;
export type SocialLinks = z.infer<typeof socialLinksSchema>;
export type Address = z.infer<typeof addressSchema>;
export type ContactInfo = z.infer<typeof contactInfoSchema>;
export type Metadata = z.infer<typeof metadataSchema>;
export type Timestamps = z.infer<typeof timestampsSchema>;
export type Audit = z.infer<typeof auditSchema>;
