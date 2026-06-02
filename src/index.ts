import express from 'express';
import cors from 'cors';
import path from 'path';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './trpc/routers/_app';
import { createContext } from './trpc/context';
import authRouter from './routes/auth';

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.use('/api', authRouter);
app.use('/trpc', createExpressMiddleware({ router: appRouter, createContext }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', version: '3.1.0' });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('LifeLift running on port ' + PORT);
});
