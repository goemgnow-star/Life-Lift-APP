import { inferAsyncReturnType } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { verifySession } from '../services/auth/session-manager';

export const createContext = ({ req }: CreateExpressContextOptions) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return { user: null };
  try {
    const token = authHeader.split(' ')[1];
    const payload = verifySession(token);
    return { user: payload };
  } catch { return { user: null }; }
};

export type Context = inferAsyncReturnType<typeof createContext>;
