import express from 'express';
import { TokenController } from '../controllers/token.controller';
import { AuthController } from '../controllers/auth.controller';

export const publicRoute = express.Router();

// Token
publicRoute.post('/auth/token', TokenController.get);

// Application
publicRoute.post('/app', AuthController.create);
