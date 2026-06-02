import { db } from "../../database/connection";
import { userCourseProgress } from "../../database/schema/user_course_progress";
import { eq, and } from "drizzle-orm";

export const startCourse = async (userId: number, courseId: number) => {
  const existing = await db.query.userCourseProgress.findFirst({
    where: and(eq(userCourseProgress.user_id, userId), eq(userCourseProgress.course_id, courseId)),
  });
  if (existing) {
    if (existing.status === "not_started" || existing.status === "paused") {
      await db.update(userCourseProgress).set({ status: "in_progress" }).where(eq(userCourseProgress.id, existing.id));
    }
    return existing;
  }
  const [row] = await db.insert(userCourseProgress).values({ user_id: userId, course_id: courseId, status: "in_progress" }).returning();
  return row;
};

export const completeCourse = async (userId: number, courseId: number) => {
  await db.update(userCourseProgress)
    .set({ status: "completed", completion_date: new Date() })
    .where(and(eq(userCourseProgress.user_id, userId), eq(userCourseProgress.course_id, courseId)));
};

export const getUserProgress = async (userId: number) => {
  return db.query.userCourseProgress.findMany({ where: eq(userCourseProgress.user_id, userId) });
};
