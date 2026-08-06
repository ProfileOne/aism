import { pgTable, text, serial, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

// Delegates table for authentication
export const delegatesTable = pgTable("delegates", {
  id: serial("id").primaryKey(),
  portfolio: text("portfolio").notNull(),
  phoneNumber: text("phone_number").notNull(),
  email: text("email"),
  category: text("category").notNull(),
  role: text("role").notNull(),
});

export const insertDelegateSchema = createInsertSchema(delegatesTable).omit({ id: true });
export type InsertDelegate = z.infer<typeof insertDelegateSchema>;
export type Delegate = typeof delegatesTable.$inferSelect;

// Delegate scores table for marksheet
export const delegateScoresTable = pgTable("delegate_scores", {
  id: serial("id").primaryKey(),
  delegateId: serial("delegate_id").notNull().references(() => delegatesTable.id),
  day: text("day").notNull(), // 'day1' or 'day2'
  attendance: text("attendance"), // 'Present' or 'Present & Voting'
  openingStatement: numeric("opening_statement"), // 0-10
  chits: numeric("chits"), // 0-10
  mod1: numeric("mod1"), // 0-10
  mod2: numeric("mod2"), // 0-10
  mod3: numeric("mod3"), // 0-10
  mod4: numeric("mod4"), // 0-10
  lobbying: numeric("lobbying"), // 0-10
  solutionPaper: numeric("solution_paper"), // 0-10
  updatedAt: text("updated_at").notNull(), // ISO timestamp
});

export const insertDelegateScoreSchema = createInsertSchema(delegateScoresTable).omit({ id: true });
export type InsertDelegateScore = z.infer<typeof insertDelegateScoreSchema>;
export type DelegateScore = typeof delegateScoresTable.$inferSelect;
