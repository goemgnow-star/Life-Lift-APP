import { db } from "../database/connection";
import { assessments } from "../database/schema/assessments";
import { eq } from "drizzle-orm";

export const updateAssessmentTier = async (assessmentId: number, calculatedTier: number): Promise<void> => {
  if (calculatedTier < 1 || calculatedTier > 4) throw new Error("Invalid tier: Must be between 1 and 4.");
  await db.update(assessments).set({ stability_tier: calculatedTier }).where(eq(assessments.id, assessmentId));
};
