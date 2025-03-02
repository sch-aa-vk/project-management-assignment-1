import { Router } from "express";
import { getAllTransactions, getTransactions, transfer } from "../controllers/transactionController";

const router = Router();

/**
 * @openapi
 * /transaction/transfer:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Transfer money between accounts
 *     tags:
 *       - Transactions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromAccountName:
 *                 type: string
 *               toAccountName:
 *                 type: string
 *               amount:
 *                 type: number
 *             required:
 *               - fromAccountName
 *               - toAccountName
 *               - amount
 *     responses:
 *       200:
 *         description: Transfer successful
 *       400:
 *         description: Invalid request
 * /transaction/history/{accountName}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Generate account statement for a specific account
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: accountName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the account
 *     responses:
 *       200:
 *         description: Statement generated successfully
 *       400:
 *         description: Invalid request
 * /transaction/history:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all transactions
 *     tags:
 *       - Transactions
 *     responses:
 *       200:
 *         description: Transactions retrieved successfully
 *       400:
 *         description: Invalid request
 */
router.post("/transfer", transfer);
router.get("/history/:accountName", getTransactions);
router.get("/history", getAllTransactions);

export default router;
