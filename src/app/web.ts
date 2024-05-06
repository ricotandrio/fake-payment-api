import express from 'express';
import { errorMiddleware } from '../middlewares/error';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { authRoute } from '../routes/auth-route';
import { publicRoute } from '../routes/public-route';

dotenv.config();
export const JWT_SECRET = process.env.JWT_SECRET;

export const web = express();

web.use(express.json());
web.use(cookieParser());

web.use(publicRoute);
web.use(authRoute);

web.use(errorMiddleware);
