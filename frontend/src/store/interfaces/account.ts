export interface IAccount {
  owner: string;
  balance: number;
  accountType: "savings" | "checking";
  accountName: string;
}