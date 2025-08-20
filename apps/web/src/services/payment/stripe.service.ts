import { loadStripe, Stripe } from '@stripe/stripe-js';

export class StripeService {
  private stripe: Stripe | null = null;

  async initialize(): Promise<void> {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      throw new Error('Stripe publishable key not found');
    }
    
    this.stripe = await loadStripe(publishableKey);
  }

  async createPaymentIntent(amount: number, currency: string = 'usd'): Promise<string> {
    if (!this.stripe) {
      await this.initialize();
    }

    const response = await fetch('/api/payments/create-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    const { clientSecret } = await response.json();
    return clientSecret;
  }

  async confirmPayment(clientSecret: string, paymentMethod: any): Promise<any> {
    if (!this.stripe) {
      throw new Error('Stripe not initialized');
    }

    const { error, paymentIntent } = await this.stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: paymentMethod,
      }
    );

    if (error) {
      throw new Error(error.message);
    }

    return paymentIntent;
  }

  async createSubscription(priceId: string, customerId: string): Promise<any> {
    const response = await fetch('/api/payments/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        customerId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create subscription');
    }

    return response.json();
  }
}
