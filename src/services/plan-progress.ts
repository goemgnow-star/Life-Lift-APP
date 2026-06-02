import { db } from "../database/connection";
import { plans } from "../database/schema/plans";
import { eq, and } from "drizzle-orm";

export const updateDailyProgress = async (planId: number, userId: number): Promise<{ success: boolean; nextDay: number }> => {
  const plan = await db.query.plans.findFirst({
    where: and(eq(plans.id, planId), eq(plans.user_id, userId)),
  });

  if (!plan) throw new Error("Plan not found or unauthorized.");

  const nextDay = ((plan.current_day ?? 0) ?? 0) + 1;
  const isComplete = nextDay >= ((plan.duration_days ?? 1) ?? 1);

  await db.update(plans)
    .set({ current_day: nextDay, status: isComplete ? 'completed' : 'active' })
    .where(eq(plans.id, planId));

  return { success: true, nextDay };
};
