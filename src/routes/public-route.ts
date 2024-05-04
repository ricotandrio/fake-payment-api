import express from 'express';
import { TokenController } from '../controllers/token.controller';

export const publicRouter = express.Router();

// Auth API
publicRouter.post('/auth/token', TokenController.get);
publicRouter.get('/auth/token/:token/:user_id', TokenController.verify);