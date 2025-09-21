// src/services/payment/types.ts

export interface PaymentService {
  purchasePoints(data: { planId: string; amount: number; price: number; paymentMethod: string }): Promise<{ transactionId: string }>;
  purchaseBoosts(data: { planId: string; amount: number; pointsCost: number }): Promise<{ transactionId: string }>;
  purchaseLikes(data: { planId: string; amount: number; pointsCost: number }): Promise<{ transactionId: string }>;
}
