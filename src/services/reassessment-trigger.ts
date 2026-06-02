import { db } from "../database/connection";
import { plans } from "../database/schema/plans";
import { eq, and } from "drizzle-orm";

export const checkHopeReassessment = async (planId: number, userId: number): Promise<{ triggerReassessment: boolean; reason?: string }> => {
  const plan = await db.query.plans.findFirst({
    where: and(eq(plans.id, planId), eq(plans.user_id, userId)),
  });
  if (!plan) throw new Error("Plan not found.");

  const createdDate = new Date(plan.created_at);
  const now = new Date();
  const daysElapsed = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));

  const isIntervalReached = daysElapsed >= 3 && daysElapsed <= 7;
  const isEngagementSufficient = (plan.current_day ?? 0) > 0;

  if (isIntervalReached && isEngagementSufficient) {
    return { triggerReassessment: true, reason: "Hope AI: Scheduled adaptive re-evaluation." };
  }
  return { triggerReassessment: false };
};
