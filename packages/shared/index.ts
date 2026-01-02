/**
 * Shared types and utilities for Splitrova
 */

// Example shared types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
  createdAt: Date;
}

// Example shared constants
export const APP_NAME = "Splitrova";

// Example shared utility
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}
