import express from 'express';
import { apiRouter } from '../routes/index.route';

export const web = express();

web.use(express.json());
web.use(apiRouter);
