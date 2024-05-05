import express from 'express';
import { route } from '../routes/api-route';
import { errorMiddleware } from '../middlewares/error';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { cookiesMiddleware } from '../middlewares/cookies';

dotenv.config();
export const JWT_SECRET = process.env.JWT_SECRET;

export const web = express();

web.use(express.json());
web.use(cookieParser());
web.use(route);
web.use(cookiesMiddleware);
web.use(cookiesMiddleware)
web.use(errorMiddleware);
