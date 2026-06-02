import { db } from "../database/connection";
import { plans } from "../database/schema/plans";
import { GeneratedPlan } from "./plan-generator";

export const persistPlan = async (userId: number, assessmentId: number, plan: GeneratedPlan): Promise<void> => {
  await db.insert(plans).values({
    user_id: userId,
    assessment_id: assessmentId,
    focus_pillar: plan.primary_focus_pillar,
    duration_days: (plan.duration_days ?? 1),
    daily_tasks: plan.daily_tasks,
  });
};
