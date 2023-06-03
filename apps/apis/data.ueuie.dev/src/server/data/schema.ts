import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
// ----

export const emails = sqliteTable('emails', {
  id: text("token", { length: 21 }).notNull(),
  email: text('email', { length: 320 }).notNull().primaryKey(),
  timestamp: integer('timestamp', { mode: 'timestamp' }).notNull(),
});
