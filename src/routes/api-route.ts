import express from 'express';
import { TokenController } from '../controllers/token.controller';
import { TransactionController } from '../controllers/transaction.controller';

export const route = express.Router();

// Token
route.post('/auth/token', TokenController.get);

// Transaction
route.post('/transaction', TransactionController.create);

// Application
