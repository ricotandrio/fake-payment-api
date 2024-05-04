import express from 'express';
import { publicRouter } from '../routes/public-route';
import { errorMiddleware } from '../middlewares/error.middleware';
import dotenv from 'dotenv';

dotenv.config();
export const JWT_SECRET = process.env.JWT_SECRET;

export const web = express();

web.use(express.json());
web.use(publicRouter);
web.use(errorMiddleware);
