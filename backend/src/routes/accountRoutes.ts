import { Router } from "express";
import { createAccount, getAccounts, viewAccount } from "../controllers/accountController";

const router = Router();

/**
 * @openapi
 * /account/create:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new account
 *     tags:
 *       - Accounts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountType:
 *                 type: string
 *                 enum: ['savings', 'checking']
 *               accountName:
 *                type: string
 *               balance:
 *                type: number
 *             required:
 *               - accountType
 *               - accountName
 *               - balance
 *     responses:
 *       201:
 *         description: Account created successfully
 *       400:
 *         description: Bad request
 *
 * /account/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: View an account by ID
 *     tags:
 *       - Accounts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account details
 *       404:
 *         description: Account not found
 *
 * /account:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all accounts
 *     tags:
 *       - Accounts
 *     responses:
 *       200:
 *         description: A list of accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   accountType:
 *                     type: string
 *                     enum: ['savings', 'checking']
 *       404:
 *         description: No accounts found
 */
router.post("/create", createAccount);
router.get("/:id", viewAccount);
router.get("/", getAccounts);

export default router;
