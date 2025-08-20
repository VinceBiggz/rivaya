export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  avatar?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  timezone: string;
  language: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export interface UserProfile extends User {
  bio?: string;
  location?: string;
  occupation?: string;
  company?: string;
  website?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    whatsapp: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'group_members' | 'private';
    showPhoneNumber: boolean;
    showEmail: boolean;
    showLocation: boolean;
  };
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
}

export interface UserSession {
  id: string;
  userId: string;
  token: string;
  refreshToken: string;
  expiresAt: Date;
  deviceInfo?: {
    userAgent: string;
    ipAddress: string;
    deviceType: 'mobile' | 'tablet' | 'desktop';
  };
  isActive: boolean;
  createdAt: Date;
  lastUsedAt: Date;
}

export interface UserInvitation {
  id: string;
  email: string;
  invitedBy: string;
  groupId: string;
  role: GroupRole;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  expiresAt: Date;
  createdAt: Date;
  acceptedAt?: Date;
}

export type GroupRole = 'admin' | 'treasurer' | 'secretary' | 'member';
