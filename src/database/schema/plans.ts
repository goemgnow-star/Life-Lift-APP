import { pgTable, serial, integer, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { users } from "./users";
import { assessments } from "./assessments";

export const plans = pgTable("plans", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  assessment_id: integer("assessment_id").references(() => assessments.id, { onDelete: "set null" }),
  focus_pillar: varchar("focus_pillar", { length: 50 }).notNull(),
  duration_days: integer("duration_days").default(7),
  daily_tasks: jsonb("daily_tasks"),
  current_day: integer("current_day").default(0),
  status: varchar("status", { enum: ["active", "completed", "paused"] }).default("active"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  completed_at: timestamp("completed_at"),
});
