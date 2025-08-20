// Re-export Prisma types
export type {
  Profile,
  UserPreferences,
  UserSession,
  Group,
  GroupMember,
  GroupInvitation,
  ContributionTier,
  Household,
  MemberContribution,
  Payment,
  Event,
  EventRSVP,
  MeetingMinutes,
  MediaAsset,
  MediaComment,
  MediaReaction,
} from '@prisma/client';

// Database operation types
export interface DatabaseConfig {
  url: string;
  maxConnections?: number;
  timeout?: number;
}

export interface MigrationResult {
  success: boolean;
  message: string;
  timestamp: Date;
}

export interface SeedResult {
  success: boolean;
  recordsCreated: number;
  message: string;
}
