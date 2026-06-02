import { pgTable, serial, integer, date, timestamp, unique } from "drizzle-orm/pg-core";
import { habits } from "./habits";

export const habitCompletions = pgTable("habit_completions", {
  id: serial("id").primaryKey(),
  habit_id: integer("habit_id").references(() => habits.id, { onDelete: "cascade" }).notNull(),
  completed_date: date("completed_date").notNull(),
  completed_at: timestamp("completed_at").defaultNow().notNull(),
}, (table) => ({
  habitDateUnique: unique().on(table.habit_id, table.completed_date),
}));
