import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private readonly stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env['STRIPE_SECRET_KEY'] || '', {
      apiVersion: '2023-10-16',
    });
  }

  async createPaymentIntent(amount: number, currency: string = 'usd') {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return paymentIntent;
    } catch (error) {
      this.logger.error(`Failed to create payment intent: ${(error as Error).message}`);
      throw error;
    }
  }

  async createCustomer(email: string, name?: string) {
    try {
      const customerData: any = { email };
      if (name) {
        customerData.name = name;
      }
      
      const customer = await this.stripe.customers.create(customerData);

      return customer;
    } catch (error) {
      this.logger.error(`Failed to create customer: ${(error as Error).message}`);
      throw error;
    }
  }

  async createSubscription(customerId: string, priceId: string) {
    try {
      const subscription = await this.stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });

      return subscription;
    } catch (error) {
      this.logger.error(`Failed to create subscription: ${(error as Error).message}`);
      throw error;
    }
  }

  async handleWebhook(payload: string, signature: string) {
    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env['STRIPE_WEBHOOK_SECRET'] || ''
      );

      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          this.logger.log(`Payment succeeded: ${paymentIntent.id}`);
          break;
        case 'payment_intent.payment_failed':
          const failedPayment = event.data.object;
          this.logger.error(`Payment failed: ${failedPayment.id}`);
          break;
        default:
          this.logger.log(`Unhandled event type: ${event.type}`);
      }

      return event;
    } catch (error) {
      this.logger.error(`Webhook signature verification failed: ${(error as Error).message}`);
      throw error;
    }
  }
}
