import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { StatusCodes } from 'http-status-codes';

import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL?.split(',') || true,
  credentials: true
};

app.set('trust proxy', 1);
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 });
app.use(limiter);

app.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({ name: 'EventX Studio API', version: '1.0.0' });
});

app.use('/api/v1/auth', (req, res, next) => {
  console.log(`Auth route hit: ${req.method} ${req.path}`, req.body);
  next();
}, authRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/tickets', ticketRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/notifications', (req, res, next) => {
  console.log(`Notification route hit: ${req.method} ${req.path}`, req.body);
  next();
}, notificationRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
