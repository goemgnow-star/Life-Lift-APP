import { pgTable, serial, integer, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  pillar: varchar("pillar", { length: 50 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  estimated_hours: integer("estimated_hours"),
  tier_suggestion: integer("tier_suggestion"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
