import { z } from 'zod';

// Payment Processing Schema
export const paymentProcessingSchema = z.object({
  groupId: z.string().uuid('Invalid group ID'),
  memberId: z.string().uuid('Invalid member ID'),
  contributionId: z.string().uuid('Invalid contribution ID').optional(),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().min(3, 'Currency code is required').max(3, 'Currency code must be 3 characters'),
  gateway: z.enum(['stripe', 'mpesa', 'paypal', 'bank_transfer', 'cash', 'other']),
  metadata: z.object({
    description: z.string().max(200).optional(),
    reference: z.string().max(100).optional(),
    customerEmail: z.string().email('Invalid email address').optional(),
    customerPhone: z.string().optional(),
    customerName: z.string().max(100).optional(),
    billingAddress: z.object({
      line1: z.string().min(1, 'Address line 1 is required'),
      line2: z.string().optional(),
      city: z.string().min(1, 'City is required'),
      state: z.string().min(1, 'State is required'),
      postalCode: z.string().min(1, 'Postal code is required'),
      country: z.string().min(1, 'Country is required')
    }).optional()
  }).optional()
});

// Payment Method Schema
export const paymentMethodSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
  type: z.enum(['card', 'bank_account', 'mobile_money', 'paypal', 'mpesa']),
  isDefault: z.boolean().default(false),
  metadata: z.object({
    cardBrand: z.string().optional(),
    last4: z.string().length(4).optional(),
    expiryMonth: z.number().min(1).max(12).optional(),
    expiryYear: z.number().min(new Date().getFullYear()).optional(),
    bankName: z.string().optional(),
    accountType: z.string().optional(),
    phoneNumber: z.string().optional(),
    provider: z.string().optional(),
    paypalEmail: z.string().email('Invalid PayPal email').optional(),
    mpesaPhoneNumber: z.string().optional()
  })
});

// Contribution Schema
export const contributionSchema = z.object({
  groupId: z.string().uuid('Invalid group ID'),
  memberId: z.string().uuid('Invalid member ID'),
  tierId: z.string().uuid('Invalid tier ID'),
  period: z.string().regex(/^\d{4}-\d{2}$/, 'Period must be in YYYY-MM format'),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().min(3, 'Currency code is required').max(3, 'Currency code must be 3 characters'),
  dueDate: z.date(),
  notes: z.string().max(500).optional()
});

// Payment Refund Schema
export const paymentRefundSchema = z.object({
  paymentId: z.string().uuid('Invalid payment ID'),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().min(3, 'Currency code is required').max(3, 'Currency code must be 3 characters'),
  reason: z.string().min(1, 'Refund reason is required').max(200, 'Reason must be less than 200 characters')
});

// Export types
export type PaymentProcessing = z.infer<typeof paymentProcessingSchema>;
export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
export type Contribution = z.infer<typeof contributionSchema>;
export type PaymentRefund = z.infer<typeof paymentRefundSchema>;
