import { db } from "../../database/connection";
import { assessments } from "../../database/schema/assessments";
import { users } from "../../database/schema/users";
import { checkins } from "../../database/schema/checkins";
import { eq, desc, and, gte } from "drizzle-orm";
import { calculateTier } from "../tierRules";

export const isReassessmentDue = async (userId: number): Promise<boolean> => {
  const latest = await db.query.assessments.findFirst({
    where: eq(assessments.user_id, userId),
    orderBy: (assessments, { desc }) => desc(assessments.created_at),
  });
  if (!latest) return true;
  const daysSince = Math.floor((Date.now() - new Date(latest.created_at).getTime()) / (1000 * 60 * 60 * 24));
  return daysSince >= 7;
};

export const calculateEngagementScore = async (userId: number): Promise<number> => {
  const sevenDaysAgo = new Date(); sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recent = await db.query.checkins.findMany({
    where: and(eq(checkins.user_id, userId), gte(checkins.created_at, sevenDaysAgo)),
  });
  if (recent.length === 0) return 0;
  const completed = recent.filter((c) => c.action_completed).length;
  return Math.round((completed / 7) * 10);
};

export const performReassessment = async (input: {
  user_id: number; current_mental: number; current_physical: number;
  current_spiritual: number; current_financial: number; engagement_score: number; risk_flags: string[];
}) => {
  const prev = await db.query.assessments.findFirst({
    where: eq(assessments.user_id, input.user_id),
    orderBy: (assessments, { desc }) => desc(assessments.created_at),
  });
  const newTier = calculateTier(input.current_mental, input.current_physical, input.current_spiritual, input.current_financial);
  const scores = [{ p: "mental", s: input.current_mental }, { p: "physical", s: input.current_physical }, { p: "spiritual", s: input.current_spiritual }, { p: "financial", s: input.current_financial }];
  const lowest = scores.reduce((a, b) => a.s <= b.s ? a : b);
  
  let adjustedTier = newTier;
  if (input.risk_flags.includes("crisis") || input.risk_flags.includes("self_harm")) adjustedTier = 1;
  else if (input.engagement_score <= 2 && newTier >= 3) adjustedTier = Math.max(newTier - 1, 1);

  return { reassessment_needed: true, new_tier: adjustedTier, new_focus_pillar: lowest.p, tier_changed: adjustedTier !== (prev?.stability_tier ?? 1) };
};
