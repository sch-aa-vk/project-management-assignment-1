export interface ITransaction {
  account: string;
  name: string;
  amount: number;
  type: "deposit" | "withdraw";
  createdAt: string;
}