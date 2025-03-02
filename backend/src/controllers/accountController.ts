import { NextFunction, Request, Response } from "express";
import { Account } from "../models/Account";

export const createAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accountType, accountName, balance } = req.body;
    const owner = req.user?.id;
    const newAccount = new Account({ owner, balance, accountType, accountName });
    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (error) {
    if ((error as Error).message.includes("duplicate key error")) {
      res.status(400).json({ message: "Account name already exists" });
      return
    }
    next(error);
  }
};

export const viewAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accountId = req.params.id;
    const account = await Account.findById(accountId);
    if (!account) {
      res.status(404).json({ message: "Account not found" });
      return;
    }
    if (account.owner.toString() !== req.user?.id.toString()) {
      res.status(403).json({ message: "Unauthorized access!" });
      return;
    }
    res.json(account);
  } catch (error) {
    next(error);
  }
};

export const getAccounts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const owner = req.user?.id;
    const accounts = await Account.find({ owner });
    res.json(accounts);
  } catch (error) {
    next(error);
  }
};
