import { z } from 'zod';

export const PaymentStatusSchema = z.enum(['pending', 'completed', 'failed', 'cancelled']);
export const PaymentMethodSchema = z.enum(['stripe', 'mpesa', 'paypal', 'bank_transfer']);

export const PaymentSchema = z.object({
  id: z.string().uuid(),
  amount: z.number().positive(),
  currency: z.string().length(3),
  status: PaymentStatusSchema,
  method: PaymentMethodSchema,
  description: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreatePaymentSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3),
  method: PaymentMethodSchema,
  description: z.string().optional(),
});
