import { z } from 'zod';
import { t } from '../trpc';
import { protectedProcedure } from '../middleware/auth';
import { db } from '../../database/connection';
import { journalEntries } from '../../database/schema/journal_entries';
import { eq, and, desc } from 'drizzle-orm';

export const journalRouter = t.router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const rows = await db.query.journalEntries.findMany({ where: eq(journalEntries.user_id, ctx.user.userId), orderBy: desc(journalEntries.created_at) });
    return { entries: rows.map((r) => ({ id: r.id, content: r.content, created_at: String(r.created_at) })) };
  }),
  create: protectedProcedure.input(z.object({ content: z.string().min(1).max(50000) }))
    .mutation(async ({ ctx, input }) => {
      await db.insert(journalEntries).values({ user_id: ctx.user.userId, content: input.content });
      return { success: true };
    }),
  delete: protectedProcedure.input(z.object({ entry_id: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      await db.delete(journalEntries).where(and(eq(journalEntries.id, input.entry_id), eq(journalEntries.user_id, ctx.user.userId)));
      return { success: true };
    }),
});
