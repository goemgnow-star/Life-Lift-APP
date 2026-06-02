import { z } from 'zod';
import { t } from '../trpc';
import { protectedProcedure } from '../middleware/auth';
import { getSettings, updateSettings } from '../../services/settings/settingsService';

export const settingsRouter = t.router({
  get: protectedProcedure.query(async ({ ctx }) => getSettings(ctx.user.userId)),
  update: protectedProcedure
    .input(z.object({ faith_mode: z.boolean().optional(), involvement_mode: z.enum(['independent', 'supported', 'guided']).optional() }))
    .mutation(async ({ ctx, input }) => updateSettings(ctx.user.userId, input)),
});
