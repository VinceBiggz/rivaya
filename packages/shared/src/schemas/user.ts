import { z } from 'zod';

// User Registration Schema
export const userRegistrationSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  firstName: z.string().min(1, 'First name is required').max(50, 'First name must be less than 50 characters'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name must be less than 50 characters'),
  phoneNumber: z.string().optional(),
  dateOfBirth: z.date().optional(),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
  timezone: z.string().default('UTC'),
  language: z.string().default('en'),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
  acceptPrivacy: z.boolean().refine(val => val === true, 'You must accept the privacy policy'),
  marketingEmails: z.boolean().default(false)
});

// User Login Schema
export const userLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().default(false)
});

// User Profile Update Schema
export const userProfileUpdateSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name must be less than 50 characters').optional(),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name must be less than 50 characters').optional(),
  phoneNumber: z.string().optional(),
  dateOfBirth: z.date().optional(),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  location: z.string().max(100, 'Location must be less than 100 characters').optional(),
  occupation: z.string().max(100, 'Occupation must be less than 100 characters').optional(),
  company: z.string().max(100, 'Company must be less than 100 characters').optional(),
  website: z.string().url('Invalid website URL').optional(),
  socialLinks: z.object({
    facebook: z.string().url('Invalid Facebook URL').optional(),
    twitter: z.string().url('Invalid Twitter URL').optional(),
    linkedin: z.string().url('Invalid LinkedIn URL').optional(),
    instagram: z.string().url('Invalid Instagram URL').optional()
  }).optional()
});

// User Preferences Schema
export const userPreferencesSchema = z.object({
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    sms: z.boolean(),
    whatsapp: z.boolean()
  }),
  privacy: z.object({
    profileVisibility: z.enum(['public', 'group_members', 'private']),
    showPhoneNumber: z.boolean(),
    showEmail: z.boolean(),
    showLocation: z.boolean()
  }),
  theme: z.enum(['light', 'dark', 'system']),
  language: z.string(),
  timezone: z.string()
});

// Password Change Schema
export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string().min(1, 'Please confirm your password')
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Password Reset Request Schema
export const passwordResetRequestSchema = z.object({
  email: z.string().email('Invalid email address')
});

// Password Reset Confirm Schema
export const passwordResetConfirmSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string().min(1, 'Please confirm your password')
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Email Verification Schema
export const emailVerificationSchema = z.object({
  token: z.string().min(1, 'Verification token is required')
});

// Phone Verification Schema
export const phoneVerificationSchema = z.object({
  phoneNumber: z.string().min(1, 'Phone number is required'),
  code: z.string().length(6, 'Verification code must be 6 digits')
});

// User Invitation Schema
export const userInvitationSchema = z.object({
  email: z.string().email('Invalid email address'),
  groupId: z.string().uuid('Invalid group ID'),
  role: z.enum(['admin', 'treasurer', 'secretary', 'member']),
  message: z.string().max(500, 'Message must be less than 500 characters').optional()
});

// User Session Schema
export const userSessionSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
  deviceInfo: z.object({
    userAgent: z.string(),
    ipAddress: z.string(),
    deviceType: z.enum(['mobile', 'tablet', 'desktop'])
  }).optional()
});

// Export types
export type UserRegistration = z.infer<typeof userRegistrationSchema>;
export type UserLogin = z.infer<typeof userLoginSchema>;
export type UserProfileUpdate = z.infer<typeof userProfileUpdateSchema>;
export type UserPreferences = z.infer<typeof userPreferencesSchema>;
export type PasswordChange = z.infer<typeof passwordChangeSchema>;
export type PasswordResetRequest = z.infer<typeof passwordResetRequestSchema>;
export type PasswordResetConfirm = z.infer<typeof passwordResetConfirmSchema>;
export type EmailVerification = z.infer<typeof emailVerificationSchema>;
export type PhoneVerification = z.infer<typeof phoneVerificationSchema>;
export type UserInvitation = z.infer<typeof userInvitationSchema>;
export type UserSession = z.infer<typeof userSessionSchema>;
