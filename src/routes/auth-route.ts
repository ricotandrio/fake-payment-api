import express from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { AuthController } from '../controllers/auth.controller';
import { MerchantController } from '../controllers/merchant.controller';
import { AccountController } from '../controllers/account.controller';
import { authMiddleware } from '../middlewares/auth';

export const authRoute = express.Router();
authRoute.use(authMiddleware);

// Transaction
authRoute.post('/transaction', TransactionController.create);
authRoute.get('/transaction/:transaction_id', TransactionController.get);
authRoute.get('/transactions/:client_id', TransactionController.getAll);
authRoute.get('/transactions/qr/:transaction_id', TransactionController.toQRCode);

// Application
authRoute.get('/app/:client_id/:client_secret', AuthController.get);

// Merchant
authRoute.post('/merchant/create', MerchantController.create);
authRoute.put('/merchant/update', MerchantController.update);
authRoute.get('/merchant/:merchant_id', MerchantController.get);
authRoute.get('/merchants', MerchantController.getAll);
authRoute.delete('/merchant/delete/:merchant_id', MerchantController.delete);

// Account
authRoute.post('/account', AccountController.create);
authRoute.get('/account/:account_id', AccountController.get);
