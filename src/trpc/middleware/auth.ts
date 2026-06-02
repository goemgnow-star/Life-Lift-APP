import { TRPCError } from '@trpc/server';
import { t } from '../trpc';

export const authMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
  return next({ ctx: { user: ctx.user } });
});

export const protectedProcedure = t.procedure.use(authMiddleware);
