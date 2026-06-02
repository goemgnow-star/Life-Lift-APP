import { pgTable, serial, integer, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { courses } from "./courses";

export const modules = pgTable("modules", {
  id: serial("id").primaryKey(),
  course_id: integer("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  order_index: integer("order_index"),
  reflection_question: text("reflection_question"),
  try_this_today: text("try_this_today"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
