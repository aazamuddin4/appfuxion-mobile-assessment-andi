import type { Transaction } from '../types/transaction';

export type RootStackParamList = {
  Transactions: undefined;
  TransactionDetails: { transaction: Transaction };
};
