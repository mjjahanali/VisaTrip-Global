/**
 * Phase 2 Payment Gateway Architecture (Scaffolding Only).
 * Ready for future integration with bKash, Nagad, and SSLCommerz once merchant accounts are approved.
 */

export type PaymentGatewayProvider = 'bkash' | 'nagad' | 'sslcommerz';

export interface PaymentIntentRequest {
  provider: PaymentGatewayProvider;
  referenceId: string;
  customerName: string;
  customerPhone: string;
  amountBDT: number;
  serviceType: string;
  callbackUrl: string;
}

export interface PaymentIntentResponse {
  status: 'unconfigured' | 'created' | 'failed';
  gatewayUrl?: string;
  transactionId?: string;
  message: string;
}

export interface PaymentGatewayAdapter {
  provider: PaymentGatewayProvider;
  createPaymentIntent(req: PaymentIntentRequest): Promise<PaymentIntentResponse>;
  verifyPayment(transactionId: string): Promise<{ verified: boolean; amountBDT?: number }>;
}

export const phase2PaymentNotice = {
  bn: 'অনলাইন পেমেন্ট (bKash, Nagad, SSLCommerz) ফেজ-২ তে যুক্ত হবে। বর্তমানে অফিসিয়াল রিসিটসহ bKash, Nagad অথবা Bank Transfer-এ নিরাপদে পেমেন্ট গ্রহণ করা হয়।',
  en: 'Automated online checkout (bKash, Nagad, SSLCommerz) is scheduled for Phase 2. Payments are currently accepted via bKash, Nagad, or Bank Transfer with official money receipts.',
};
