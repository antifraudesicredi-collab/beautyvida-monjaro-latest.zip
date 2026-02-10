import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Tabela de clientes que realizaram compras
 */
export const customers = mysqlTable('customers', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 320 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  street: varchar('street', { length: 255 }).notNull(),
  number: varchar('number', { length: 20 }).notNull(),
  complement: varchar('complement', { length: 255 }),
  city: varchar('city', { length: 100 }).notNull(),
  state: varchar('state', { length: 2 }).notNull(),
  zipCode: varchar('zipCode', { length: 10 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type Customer = typeof customers.$inferSelect;
export type InsertCustomer = typeof customers.$inferInsert;

/**
 * Tabela de pedidos
 */
export const orders = mysqlTable('orders', {
  id: int('id').autoincrement().primaryKey(),
  customerId: int('customerId').notNull().references(() => customers.id),
  quantity: int('quantity').notNull().default(1),
  unitPrice: int('unitPrice').notNull(), // em centavos (ex: 14990 = R$ 149,90)
  totalPrice: int('totalPrice').notNull(), // em centavos
  status: mysqlEnum('status', ['pending', 'paid', 'abandoned', 'cancelled']).default('pending').notNull(),
  vegaCheckoutId: varchar('vegaCheckoutId', { length: 255 }), // ID do pedido no Vega Checkout
  paymentMethod: varchar('paymentMethod', { length: 50 }),
  notes: text('notes'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * Tabela de histórico de pagamentos
 */
export const paymentHistory = mysqlTable('paymentHistory', {
  id: int('id').autoincrement().primaryKey(),
  orderId: int('orderId').notNull().references(() => orders.id),
  status: mysqlEnum('status', ['pending', 'processing', 'approved', 'declined', 'refunded']).notNull(),
  amount: int('amount').notNull(), // em centavos
  vegaCheckoutStatus: varchar('vegaCheckoutStatus', { length: 100 }),
  vegaCheckoutMessage: text('vegaCheckoutMessage'),
  transactionId: varchar('transactionId', { length: 255 }),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type PaymentHistory = typeof paymentHistory.$inferSelect;
export type InsertPaymentHistory = typeof paymentHistory.$inferInsert;