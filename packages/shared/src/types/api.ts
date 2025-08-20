// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp: string;
  requestId: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  stack?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextPage?: number;
  prevPage?: number;
}

// API Request Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  filters?: Record<string, any>;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface ApiRequest<T = any> {
  data?: T;
  params?: Record<string, any>;
  query?: Record<string, any>;
  headers?: Record<string, string>;
}

// Authentication Types
export interface AuthRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  password: string;
}

// Webhook Types
export interface WebhookPayload<T = any> {
  event: string;
  timestamp: string;
  data: T;
  signature?: string;
}

export interface WebhookResponse {
  success: boolean;
  message: string;
  processedAt: string;
}

// File Upload Types
export interface FileUploadRequest {
  file: File;
  metadata?: Record<string, any>;
  privacy?: MediaPrivacy;
}

export interface FileUploadResponse {
  id: string;
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
}

// Real-time Types
export interface SocketMessage<T = any> {
  type: string;
  data: T;
  timestamp: string;
  userId?: string;
  groupId?: string;
}

export interface SocketEvent {
  event: string;
  data: any;
  room?: string;
  userId?: string;
}

// Search Types
export interface SearchRequest {
  query: string;
  filters?: Record<string, any>;
  pagination?: PaginationParams;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResponse<T> {
  results: T[];
  total: number;
  query: string;
  filters: Record<string, any>;
  pagination: PaginationInfo;
}

// Notification Types
export interface NotificationRequest {
  type: string;
  title: string;
  message: string;
  recipients: string[];
  data?: Record<string, any>;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  scheduledAt?: string;
}

export interface NotificationResponse {
  id: string;
  status: 'sent' | 'delivered' | 'failed' | 'scheduled';
  sentAt?: string;
  deliveredAt?: string;
  failedAt?: string;
  errorMessage?: string;
}

// Analytics Types
export interface AnalyticsRequest {
  groupId: string;
  period: string;
  metrics: string[];
  filters?: Record<string, any>;
}

export interface AnalyticsResponse {
  groupId: string;
  period: string;
  metrics: Record<string, any>;
  generatedAt: string;
}
