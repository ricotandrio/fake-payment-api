import express from 'express';
import { corsMiddleware } from '../middlewares/cors-middleware';

export const apiRouter = express.Router();
apiRouter.use(corsMiddleware);

