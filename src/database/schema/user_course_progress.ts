import { pgTable, serial, integer, varchar, timestamp, unique } from "drizzle-orm/pg-core";
import { users } from "./users";
import { courses } from "./courses";

export const userCourseProgress = pgTable("user_course_progress", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  course_id: integer("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
  status: varchar("status", { enum: ["not_started", "in_progress", "completed", "paused"] }).default("not_started"),
  current_module: integer("current_module").default(0),
  current_micro_lesson: integer("current_micro_lesson").default(0),
  completion_date: timestamp("completion_date"),
  restart_count: integer("restart_count").default(0),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  userCourseUnique: unique().on(table.user_id, table.course_id),
}));
