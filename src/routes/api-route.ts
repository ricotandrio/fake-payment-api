import express from 'express';
import { TokenController } from '../controllers/token.controller';
import { TransactionController } from '../controllers/transaction.controller';
import { AuthController } from '../controllers/auth.controller';
import { MerchantController } from '../controllers/merchant.controller';
import { AccountController } from '../controllers/account.controller';

export const route = express.Router();

// Token
route.post('/auth/token', TokenController.get);

// Transaction
route.post('/transaction', TransactionController.create);

// Application
route.post('/auth', AuthController.create);
route.get('/auth/:client_id/:client_secret', AuthController.get);

// Merchant
route.post('/merchant', MerchantController.create);
route.put('/merchant', MerchantController.update);
route.get('/merchant/:merchant_id', MerchantController.get);
route.get('/merchants', MerchantController.getAll);
route.delete('/merchant/:merchant_id', MerchantController.delete);

// Account
route.post('/account', AccountController.create);
route.get('/account/:account_id', AccountController.get);
