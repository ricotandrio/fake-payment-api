import express from 'express';
import { corsMiddleware } from '../middlewares/cors-middleware';
import { TransactionController } from '../controllers/transaction-controller';
import { QrCodeController } from '../controllers/qrcode-controller';
import { TokenController } from '../controllers/token-controller';

export const apiRouter = express.Router();
apiRouter.use(corsMiddleware);

// Transaction API
apiRouter.post('/api/transaction', TransactionController.create);
apiRouter.get('/api/transactions', TransactionController.getAll);
apiRouter.get('/api/transaction/:id', TransactionController.get);

// QR Code API
apiRouter.get('/api/qrcode/:transaction_id', QrCodeController.get);

// Token API
apiRouter.post('/api/token', TokenController.generate);

