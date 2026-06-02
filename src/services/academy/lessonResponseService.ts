import { db } from "../../database/connection";
import { userLessonResponses } from "../../database/schema/user_lesson_responses";
import { eq, and } from "drizzle-orm";

export const saveLessonResponse = async (input: {
  user_id: number; micro_lesson_id: number; reflection_answer?: string; try_this_completed?: boolean; hope_feedback?: string;
}) => {
  const existing = await db.query.userLessonResponses.findFirst({
    where: and(eq(userLessonResponses.user_id, input.user_id), eq(userLessonResponses.micro_lesson_id, input.micro_lesson_id)),
  });
  if (existing) {
    const [row] = await db.update(userLessonResponses).set({
      reflection_answer: input.reflection_answer ?? existing.reflection_answer,
      try_this_completed: input.try_this_completed ?? existing.try_this_completed,
      hope_feedback: input.hope_feedback ?? existing.hope_feedback,
    }).where(eq(userLessonResponses.id, existing.id)).returning();
    return row;
  }
  const [row] = await db.insert(userLessonResponses).values({
    user_id: input.user_id, micro_lesson_id: input.micro_lesson_id,
    reflection_answer: input.reflection_answer ?? null,
    try_this_completed: input.try_this_completed ?? false,
    hope_feedback: input.hope_feedback ?? null,
  }).returning();
  return row;
};
