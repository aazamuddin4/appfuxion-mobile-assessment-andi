export type Transaction = {
  refId: string;
  transferDate: string; // ISO string
  recipientName: string;
  transferName: string;
  amount: number;
};
