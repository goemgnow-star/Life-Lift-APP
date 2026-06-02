import { z } from 'zod';
import { t } from '../trpc';
import { protectedProcedure } from '../middleware/auth';
import { db } from '../../database/connection';
import { assessments } from '../../database/schema/assessments';
import { eq } from 'drizzle-orm';

export const assessmentRouter = t.router({
  start: protectedProcedure.mutation(async ({ ctx }) => {
    const existing = await db.query.assessments.findFirst({ where: eq(assessments.user_id, ctx.user.userId) });
    if (existing) return { message: 'Assessment already exists.', assessment_id: existing.id };
    return { message: 'Assessment started.', hope_says: "I'm glad you're here. Can you tell me what's been the hardest thing lately?" };
  }),
  answer: protectedProcedure
    .input(z.object({
      mental_score: z.number().int().min(0).max(10),
      physical_score: z.number().int().min(0).max(10),
      spiritual_score: z.number().int().min(0).max(10),
      financial_score: z.number().int().min(0).max(10),
      stability_tier: z.number().int().min(1).max(4),
      primary_focus_pillar: z.string().min(1),
      environment_context: z.string().optional(),
      assessment_notes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const [result] = await db.insert(assessments).values({
        user_id: ctx.user.userId, mental_score: input.mental_score, physical_score: input.physical_score,
        spiritual_score: input.spiritual_score, financial_score: input.financial_score,
        stability_tier: input.stability_tier, primary_focus_pillar: input.primary_focus_pillar,
        environment_context: input.environment_context ?? null, assessment_notes: input.assessment_notes ?? null,
      }).returning({ id: assessments.id });
      return { assessmentId: result.id };
    }),
});
