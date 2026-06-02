import { pgTable, serial, integer, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { microLessons } from "./micro_lessons";

export const userLessonResponses = pgTable("user_lesson_responses", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  micro_lesson_id: integer("micro_lesson_id").references(() => microLessons.id, { onDelete: "cascade" }).notNull(),
  reflection_answer: text("reflection_answer"),
  try_this_completed: boolean("try_this_completed").default(false),
  hope_feedback: text("hope_feedback"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
