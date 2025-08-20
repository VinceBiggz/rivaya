// Common Enums
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending'
}

export enum GroupStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived',
  SUSPENDED = 'suspended'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  DISPUTED = 'disputed'
}

export enum EventStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  POSTPONED = 'postponed'
}

export enum NotificationType {
  EMAIL = 'email',
  PUSH = 'push',
  SMS = 'sms',
  WHATSAPP = 'whatsapp',
  IN_APP = 'in_app'
}

export enum NotificationPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent'
}

// Common Interfaces
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SoftDeleteEntity extends BaseEntity {
  deletedAt?: Date;
  isDeleted: boolean;
}

export interface AuditableEntity extends BaseEntity {
  createdBy: string;
  updatedBy?: string;
  deletedBy?: string;
}

export interface TimestampedEntity {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  offset: number;
  total: number;
  totalPages: number;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FilterOptions {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'like' | 'ilike';
  value: any;
}

export interface SearchOptions {
  query: string;
  fields: string[];
  filters?: FilterOptions[];
  sort?: SortOptions;
  pagination?: PaginationOptions;
}

// Common Types
export type ID = string;
export type UUID = string;
export type Email = string;
export type PhoneNumber = string;
export type URL = string;
export type Currency = string;
export type Language = string;
export type Timezone = string;
export type Country = string;
export type Region = string;
export type City = string;

export type Status = 'active' | 'inactive' | 'pending' | 'suspended' | 'deleted';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Visibility = 'public' | 'private' | 'group_members' | 'selected_members';

// Common Constants
export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 20,
  maxLimit: 100
} as const;

export const SUPPORTED_CURRENCIES = [
  'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD',
  'KES', 'NGN', 'GHS', 'UGX', 'TZS', 'ZAR', 'EGP', 'MAD', 'DZD', 'TND'
] as const;

export const SUPPORTED_LANGUAGES = [
  'en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko',
  'ar', 'hi', 'sw', 'yo', 'ig', 'ha', 'am', 'so', 'rw', 'zu'
] as const;

export const SUPPORTED_TIMEZONES = [
  'UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London',
  'Europe/Paris', 'Asia/Tokyo', 'Asia/Shanghai', 'Africa/Nairobi',
  'Africa/Lagos', 'Africa/Johannesburg'
] as const;

export const FILE_SIZE_LIMITS = {
  IMAGE: 10 * 1024 * 1024, // 10MB
  VIDEO: 100 * 1024 * 1024, // 100MB
  AUDIO: 50 * 1024 * 1024, // 50MB
  DOCUMENT: 25 * 1024 * 1024, // 25MB
  ARCHIVE: 200 * 1024 * 1024 // 200MB
} as const;

export const SUPPORTED_FILE_TYPES = {
  IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  VIDEO: ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'],
  AUDIO: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4'],
  DOCUMENT: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ARCHIVE: ['application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed']
} as const;

// Common Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Required<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type Nullable<T> = T | null;

export type Undefinable<T> = T | undefined;

export type NonNullable<T> = T extends null | undefined ? never : T;

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (...args: any) => Promise<infer R> ? R : any;

export type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;
