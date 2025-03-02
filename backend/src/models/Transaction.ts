import mongoose from "mongoose";

interface ITransaction {
  account: mongoose.Schema.Types.ObjectId;
  name: string;
  amount: number;
  type: "deposit" | "withdraw";
  createdAt: Date;
}

const transactionSchema = new mongoose.Schema<ITransaction>({
  account: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true, enum: ["deposit", "withdraw"] },
  createdAt: { type: Date, default: Date.now },
});

export const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema
);
