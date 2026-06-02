import { pgTable, serial, integer, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  mental_score: integer("mental_score"),
  physical_score: integer("physical_score"),
  spiritual_score: integer("spiritual_score"),
  financial_score: integer("financial_score"),
  stability_tier: integer("stability_tier"),
  primary_focus_pillar: varchar("primary_focus_pillar", { length: 50 }),
  environment_context: varchar("environment_context", { length: 255 }),
  assessment_notes: text("assessment_notes"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
