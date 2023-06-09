import { relations } from 'drizzle-orm';
import { sqliteTable, text, integer, sqliteTableCreator, uniqueIndex } from 'drizzle-orm/sqlite-core';
// ----

/* -------------------------------------------------------------------------- */
/*                              Emails Management                             */
/* -------------------------------------------------------------------------- */
export const emails = sqliteTable(
  'emails',
  {
    id: integer('id').primaryKey(),
    email: text('email', { length: 320 }).notNull(),
    token: text('token', { length: 21 }).notNull(),
    timestamp: integer('timestamp', { mode: 'timestamp' }).notNull(),
  },
  (emails) => ({
    idx_unique_token: uniqueIndex('idx_unique_token').on(emails.token),
    idx_unique_email: uniqueIndex('idx_unique_email').on(emails.email),
  })
);

/* -------------------------------------------------------------------------- */
/*                              Access Management                             */
/* -------------------------------------------------------------------------- */
export const accessTable = sqliteTableCreator((name) => `access.${name}`);

export const ips = accessTable(
  'ips',
  {
    id: integer('id').primaryKey(),
    ip: text('ip', { length: 45 }).notNull(),
    type: text('type', { enum: ['v4', 'v6'] }).notNull(),
  },
  (ips) => ({
    idx_unique_ip: uniqueIndex('idx_unique_ip').on(ips.ip),
  })
);

export const ipsRelations = relations(ips, ({ many }) => ({
  accesslogs: many(access),
}));

export const access = accessTable('access', {
  id: integer('id').primaryKey(),
  ipid: integer('ipid')
    .references(() => ips.id)
    .notNull(),
  timestamp: integer('timestamp', { mode: 'timestamp_ms' }).notNull(),
});

export const accessRelations = relations(access, ({ one }) => ({
  ip: one(ips, {
    fields: [access.ipid],
    references: [ips.id],
  }),
}));
