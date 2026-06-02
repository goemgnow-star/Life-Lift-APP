import { db } from "../../database/connection";
import { courses } from "../../database/schema/courses";
import { modules } from "../../database/schema/modules";
import { microLessons } from "../../database/schema/micro_lessons";
import { eq } from "drizzle-orm";

export const loadCourses = async (pillar?: string) => {
  if (pillar) return db.query.courses.findMany({ where: eq(courses.pillar, pillar) });
  return db.query.courses.findMany();
};

export const loadCourseWithModules = async (courseId: number) => {
  const course = await db.query.courses.findFirst({ where: eq(courses.id, courseId) });
  if (!course) throw new Error("Course not found");
  const mods = await db.query.modules.findMany({ where: eq(modules.course_id, courseId), orderBy: (modules, { asc }) => asc(modules.order_index) });
  return { course, modules: mods };
};

export const getMicroLesson = async (lessonId: number, faithMode: boolean = false) => {
  const row = await db.query.microLessons.findFirst({ where: eq(microLessons.id, lessonId) });
  if (!row) throw new Error("Lesson not found");
  return { ...row, content: faithMode && row.faith_variant_content ? row.faith_variant_content : row.content };
};

export const getSuggestedCourses = async (tier: number) => {
  return db.query.courses.findMany({ where: eq(courses.tier_suggestion, tier) });
};
