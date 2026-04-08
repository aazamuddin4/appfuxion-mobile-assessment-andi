import { create } from 'zustand';

import { mockTransactions } from '../data/mockTransactions';
import type { Transaction } from '../types/transaction';

type TransactionsState = {
  transactions: Transaction[];
  isLoading: boolean;
  errorMessage?: string;
  fetchLatestTransactions: () => Promise<void>;
};

export const useTransactionsStore = create<TransactionsState>(set => ({
  transactions: [],
  isLoading: false,
  errorMessage: undefined,
  fetchLatestTransactions: async () => {
    set({ isLoading: true, errorMessage: undefined });

    // Simulate a real API call.
  await new Promise<void>(resolve => setTimeout(resolve, 250));

    // In a real app, we'd fetch and normalize data here.
    set({ transactions: mockTransactions, isLoading: false });
  },
}));
