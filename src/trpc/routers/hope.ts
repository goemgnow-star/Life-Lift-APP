import { z } from 'zod';
import { t } from '../trpc';
import { protectedProcedure } from '../middleware/auth';
import { storeMessage, getHistory } from '../../services/chat/chatPersistenceService';
import { callHopeAI } from '../../services/ai-proxy';
import { detectCrisis } from '../../services/crisis/crisisRouter';
import { getCrisisResponse } from '../../services/crisis/crisisResponseFactory';
import { db } from '../../database/connection';
import { users } from '../../database/schema/users';
import { eq } from 'drizzle-orm';

export const hopeRouter = t.router({
  chat: protectedProcedure
    .input(z.object({ message: z.string().min(1).max(5000) }))
    .mutation(async ({ ctx, input }) => {
      await storeMessage({ user_id: ctx.user.userId, role: 'user', content: input.message });
      const crisis = detectCrisis({ message: input.message });
      if (crisis.crisisDetected) {
        const response = getCrisisResponse(crisis.category!);
        await storeMessage({ user_id: ctx.user.userId, role: 'assistant', content: response });
        return { reply: response, crisis: true };
      }
      const user = await db.query.users.findFirst({ where: eq(users.id, ctx.user.userId) });
      const reply = await callHopeAI({ user_id: ctx.user.userId, tier: user?.stability_tier ?? 1, faith_mode: user?.faith_mode ?? false, prompt: input.message });
      await storeMessage({ user_id: ctx.user.userId, role: 'assistant', content: reply });
      return { reply, crisis: false };
    }),
  getHistory: protectedProcedure
    .input(z.object({ limit: z.number().int().min(1).max(200).optional() }))
    .query(async ({ ctx, input }) => getHistory({ user_id: ctx.user.userId, limit: input.limit })),
});
