import mongoose from "mongoose";

interface IAccount {
  owner: mongoose.Schema.Types.ObjectId;
  balance: number;
  accountType: "savings" | "checking";
  accountName: string;
}

const accountSchema = new mongoose.Schema<IAccount>({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, required: true },
  accountType: { type: String, required: true, enum: ["savings", "checking"] },
  accountName: { type: String, required: true, unique: true },
});

export const Account = mongoose.model<IAccount>("Account", accountSchema);
