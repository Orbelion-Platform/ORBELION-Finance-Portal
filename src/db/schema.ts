import { sql } from "drizzle-orm";
import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const accounts = sqliteTable(
  "finance_accounts",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    name: text("name").notNull(),
    type: text("type").notNull(),
    currency: text("currency").notNull().default("CRC"),
    openingBalanceMinor: integer("opening_balance_minor").notNull().default(0),
    creditLimitMinor: integer("credit_limit_minor").notNull().default(0),
    active: integer("active", { mode: "boolean" }).notNull().default(true),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("idx_finance_accounts_user_active").on(table.userId, table.active)],
);

export const transactions = sqliteTable(
  "finance_transactions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    accountId: text("account_id").notNull(),
    destinationAccountId: text("destination_account_id"),
    obligationId: text("obligation_id"),
    type: text("type").notNull(),
    status: text("status").notNull().default("confirmed"),
    category: text("category").notNull().default("Uncategorized"),
    description: text("description").notNull(),
    amountMinor: integer("amount_minor").notNull(),
    currency: text("currency").notNull().default("CRC"),
    occurredOn: text("occurred_on").notNull(),
    notes: text("notes").notNull().default(""),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("idx_finance_transactions_user_currency_date").on(
      table.userId,
      table.currency,
      table.occurredOn,
    ),
  ],
);
export const obligations = sqliteTable(
  "finance_obligations",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    kind: text("kind").notNull(),
    title: text("title").notNull(),
    counterparty: text("counterparty").notNull().default(""),
    currency: text("currency").notNull().default("CRC"),
    originalAmountMinor: integer("original_amount_minor").notNull(),
    balanceMinor: integer("balance_minor").notNull(),
    interestBps: integer("interest_bps").notNull().default(0),
    category: text("category").notNull().default("Other"),
    dueDate: text("due_date").notNull(),
    status: text("status").notNull().default("open"),
    recurrence: text("recurrence").notNull().default("none"),
    recurrenceGroupId: text("recurrence_group_id"),
    reminderEnabled: integer("reminder_enabled", { mode: "boolean" })
      .notNull()
      .default(true),
    reminderEmail: text("reminder_email").notNull().default(""),
    paidAt: text("paid_at"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("idx_finance_obligations_user_kind_status_due").on(
      table.userId,
      table.kind,
      table.status,
      table.dueDate,
    ),
  ],
);

export const budgets = sqliteTable(
  "finance_budgets",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    month: text("month").notNull(),
    category: text("category").notNull(),
    currency: text("currency").notNull().default("CRC"),
    limitMinor: integer("limit_minor").notNull(),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    uniqueIndex("uidx_finance_budgets_user_month_category_currency").on(
      table.userId,
      table.month,
      table.category,
      table.currency,
    ),
  ],
);
