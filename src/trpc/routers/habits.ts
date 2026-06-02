import { z } from 'zod';
import { t } from '../trpc';
import { protectedProcedure } from '../middleware/auth';
import { db } from '../../database/connection';
import { habits } from '../../database/schema/habits';
import { habitCompletions } from '../../database/schema/habit_completions';
import { eq, and } from 'drizzle-orm';

export const habitsRouter = t.router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const rows = await db.query.habits.findMany({ where: eq(habits.user_id, ctx.user.userId) });
    const today = new Date().toISOString().split('T')[0];
    const result = await Promise.all(rows.map(async (h) => {
      const c = await db.query.habitCompletions.findFirst({ where: and(eq(habitCompletions.habit_id, h.id), eq(habitCompletions.completed_date, today)) });
      return { id: h.id, name: h.name, description: h.description, completedToday: !!c };
    }));
    return { habits: result };
  }),
  create: protectedProcedure.input(z.object({ name: z.string().min(1).max(255), description: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      await db.insert(habits).values({ user_id: ctx.user.userId, name: input.name, description: input.description ?? null });
      return { success: true };
    }),
  complete: protectedProcedure.input(z.object({ habit_id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      const today = new Date().toISOString().split('T')[0];
      await db.insert(habitCompletions).values({ habit_id: input.habit_id, completed_date: today }).onConflictDoNothing();
      return { success: true };
    }),
  delete: protectedProcedure.input(z.object({ habit_id: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      await db.delete(habits).where(and(eq(habits.id, input.habit_id), eq(habits.user_id, ctx.user.userId)));
      return { success: true };
    }),
});
