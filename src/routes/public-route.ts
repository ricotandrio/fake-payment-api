import express from 'express';
import { AuthController } from '../controllers/auth.controller';

export const publicRouter = express.Router();

// Auth API
publicRouter.post('/auth/token', AuthController.generateToken);
publicRouter.get('/auth/token/:token', AuthController.validateToken);