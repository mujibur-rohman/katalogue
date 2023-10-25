import express, { Application } from 'express';
import router from '../route';
import { errorMiddleware } from '../middleware/error.middleware';
import cors from 'cors';

export const app: Application = express();
export const PORT: number = 5000;

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'] }));
app.use(express.json());
router(app);
app.use(express.static('public'));
app.use(errorMiddleware);
