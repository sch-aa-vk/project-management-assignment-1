import { NextFunction, Request, Response } from "express";
import { Account } from "../models/Account";
import { Transaction } from "../models/Transaction";
import mongoose from "mongoose";

const handleTransaction = async (
  accountId: mongoose.Types.ObjectId,
  amount: number,
  type: "deposit" | "withdraw"
) => {
  const account = await Account.findById(accountId);
  if (!account) throw new Error("Account not found");

  if (type === "deposit") {
    account.balance += amount;
  } else if (type === "withdraw") {
    if (account.balance < amount) {
      throw new Error("Insufficient funds");
    }
    account.balance -= amount;
  }

  await account.save();

  const transaction = new Transaction({
    account: accountId,
    name: account.accountName,
    amount,
    type,
  });

  await transaction.save();
};

export const transfer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fromAccountName, toAccountName, amount } = req.body;

  try {
    const fromAccount = await Account.findOne({ accountName: fromAccountName });
    const toAccount = await Account.findOne({ accountName: toAccountName });

    if (!fromAccount) {
      res.status(404).json({ message: "From account not found" });
      return;
    };
    if (!toAccount) {
      res.status(404).json({ message: "To account not found" });
      return;
    }

    await handleTransaction(fromAccount._id, amount, "withdraw");
    await handleTransaction(toAccount._id, amount, "deposit");
    res.json({ message: "Transfer successful" });
  } catch (error) {
    next(error);
  }
};

export const getTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accountName = req.params.accountName;
    const account = await Account.findOne({ accountName });

    if (!account) {
      res.status(404).json({ message: "Account not found" });
      return;
    }

    const transactions = await Transaction.find({ account: account._id }).sort({
      createdAt: -1,
    });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

export const getAllTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const owner = req.user?.id;
    const accounts = await Account.find({ owner });
    const accountIds = accounts.map((account) => account._id);
    const transactions = await Transaction.find({ account: { $in: accountIds } }).sort({
      createdAt: -1,
    });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};