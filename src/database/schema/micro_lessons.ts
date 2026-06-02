import { pgTable, serial, integer, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { modules } from "./modules";

export const microLessons = pgTable("micro_lessons", {
  id: serial("id").primaryKey(),
  module_id: integer("module_id").references(() => modules.id, { onDelete: "cascade" }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  duration_minutes: integer("duration_minutes"),
  content_type: varchar("content_type", { enum: ["text", "video", "audio"] }).default("text"),
  faith_variant_content: text("faith_variant_content"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
