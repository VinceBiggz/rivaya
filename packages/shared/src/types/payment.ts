export interface Payment {
  id: string;
  groupId: string;
  memberId: string;
  contributionId?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  gateway: PaymentGateway;
  gatewayTransactionId?: string;
  gatewayResponse?: Record<string, any>;
  metadata: PaymentMetadata;
  createdAt: Date;
  updatedAt: Date;
  processedAt?: Date;
  failedAt?: Date;
  refundedAt?: Date;
}

export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded' | 'disputed';
export type PaymentGateway = 'stripe' | 'mpesa' | 'paypal' | 'bank_transfer' | 'cash' | 'other';

export interface PaymentMetadata {
  description?: string;
  reference?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerName?: string;
  billingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  customFields?: Record<string, any>;
}

export interface MemberContribution {
  id: string;
  groupId: string;
  memberId: string;
  tierId: string;
  period: string; // YYYY-MM format
  amount: number;
  currency: string;
  status: ContributionStatus;
  dueDate: Date;
  paidAt?: Date;
  paymentId?: string;
  lateFees?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ContributionStatus = 'pending' | 'paid' | 'overdue' | 'waived' | 'cancelled';

export interface PaymentMethod {
  id: string;
  userId: string;
  type: PaymentMethodType;
  isDefault: boolean;
  isActive: boolean;
  metadata: PaymentMethodMetadata;
  createdAt: Date;
  updatedAt: Date;
  lastUsedAt?: Date;
}

export type PaymentMethodType = 'card' | 'bank_account' | 'mobile_money' | 'paypal' | 'mpesa';

export interface PaymentMethodMetadata {
  // For cards
  cardBrand?: string;
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  
  // For bank accounts
  bankName?: string;
  accountType?: string;
  last4?: string;
  
  // For mobile money
  phoneNumber?: string;
  provider?: string;
  
  // For PayPal
  paypalEmail?: string;
  
  // For M-Pesa
  mpesaPhoneNumber?: string;
}

export interface PaymentWebhook {
  id: string;
  gateway: PaymentGateway;
  eventType: string;
  payload: Record<string, any>;
  signature?: string;
  isProcessed: boolean;
  processedAt?: Date;
  errorMessage?: string;
  createdAt: Date;
}

export interface PaymentRefund {
  id: string;
  paymentId: string;
  amount: number;
  currency: string;
  reason: string;
  status: 'pending' | 'completed' | 'failed';
  gatewayRefundId?: string;
  processedAt?: Date;
  createdAt: Date;
  createdBy: string;
}

export interface PaymentAnalytics {
  groupId: string;
  period: string; // YYYY-MM format
  totalAmount: number;
  totalPayments: number;
  completedPayments: number;
  failedPayments: number;
  pendingPayments: number;
  averagePaymentAmount: number;
  paymentMethods: Record<PaymentGateway, number>;
  monthlyTrend: {
    month: string;
    amount: number;
    count: number;
  }[];
}
