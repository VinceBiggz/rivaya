export interface Group {
  id: string;
  name: string;
  description?: string;
  type: GroupType;
  category: GroupCategory;
  avatar?: string;
  coverImage?: string;
  isPublic: boolean;
  isActive: boolean;
  settings: GroupSettings;
  metadata: GroupMetadata;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export type GroupType = 'family' | 'alumni' | 'sacco' | 'friends' | 'business' | 'community';
export type GroupCategory = 'immediate_family' | 'extended_family' | 'high_school' | 'university' | 'workplace' | 'church' | 'neighborhood' | 'hobby' | 'other';

export interface GroupSettings {
  membership: {
    approvalRequired: boolean;
    allowInvitations: boolean;
    maxMembers?: number;
    allowGuestAccess: boolean;
  };
  contributions: {
    enabled: boolean;
    currency: string;
    frequency: 'monthly' | 'quarterly' | 'yearly' | 'custom';
    autoReminders: boolean;
    lateFees: boolean;
    lateFeeAmount?: number;
  };
  events: {
    allowMemberEvents: boolean;
    requireApproval: boolean;
    maxEventDuration?: number; // in days
  };
  privacy: {
    memberListVisibility: 'public' | 'members_only' | 'admins_only';
    activityVisibility: 'public' | 'members_only' | 'admins_only';
    allowExternalSharing: boolean;
  };
  notifications: {
    emailDigest: boolean;
    digestFrequency: 'daily' | 'weekly' | 'monthly';
    pushNotifications: boolean;
    smsNotifications: boolean;
  };
}

export interface GroupMetadata {
  location?: {
    country: string;
    region?: string;
    city?: string;
    coordinates?: [number, number];
  };
  tags: string[];
  customFields: Record<string, any>;
  statistics: {
    totalMembers: number;
    activeMembers: number;
    totalContributions: number;
    totalEvents: number;
    lastActivityAt?: Date;
  };
}

export interface GroupMember {
  id: string;
  groupId: string;
  userId: string;
  role: GroupRole;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  joinedAt: Date;
  invitedBy?: string;
  invitedAt?: Date;
  acceptedAt?: Date;
  leftAt?: Date;
  permissions: GroupPermissions;
  contributionTier?: string;
  householdId?: string;
}

export interface GroupPermissions {
  canInviteMembers: boolean;
  canRemoveMembers: boolean;
  canEditGroup: boolean;
  canDeleteGroup: boolean;
  canManageEvents: boolean;
  canManageContributions: boolean;
  canViewAnalytics: boolean;
  canManageRoles: boolean;
}

export interface ContributionTier {
  id: string;
  groupId: string;
  name: string;
  description?: string;
  amount: number;
  currency: string;
  frequency: 'monthly' | 'quarterly' | 'yearly' | 'custom';
  isDefault: boolean;
  isActive: boolean;
  maxMembers?: number;
  benefits?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Household {
  id: string;
  groupId: string;
  name: string;
  description?: string;
  headOfHousehold: string;
  members: string[];
  contributionTier?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GroupInvitation {
  id: string;
  groupId: string;
  email: string;
  invitedBy: string;
  role: GroupRole;
  message?: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  expiresAt: Date;
  createdAt: Date;
  acceptedAt?: Date;
  acceptedBy?: string;
}
