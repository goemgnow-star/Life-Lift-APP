import { pgTable, serial, integer, varchar, date, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const victoryPaths = pgTable("victory_paths", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  path_type: varchar("path_type", { enum: ["24h", "3d", "7d", "30d", "90d"] }).notNull(),
  status: varchar("status", { enum: ["active", "completed", "paused", "restarted"] }).default("active"),
  start_date: date("start_date").notNull(),
  completion_date: date("completion_date"),
  restart_count: integer("restart_count").default(0),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
