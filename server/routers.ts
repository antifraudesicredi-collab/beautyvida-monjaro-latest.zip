import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { customers, orders, paymentHistory } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  dashboard: router({
    kpis: protectedProcedure.query(async () => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');

      const totalOrders = await db.select().from(orders);
      const paidOrders = totalOrders.filter(o => o.status === 'paid');
      const pendingOrders = totalOrders.filter(o => o.status === 'pending');
      const totalRevenue = paidOrders.reduce((sum, o) => sum + o.totalPrice, 0);

      return {
        totalOrders: totalOrders.length,
        paidOrders: paidOrders.length,
        pendingOrders: pendingOrders.length,
        totalRevenue: totalRevenue / 100,
        averageOrderValue: paidOrders.length > 0 ? (totalRevenue / paidOrders.length) / 100 : 0,
      };
    }),

    sales: protectedProcedure
      .input(z.object({
        limit: z.number().default(50),
        offset: z.number().default(0),
      }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error('Database not available');

        const paidOrders = await db.select().from(orders).where(eq(orders.status, 'paid'));
        const ordersWithCustomers = await Promise.all(
          paidOrders.map(async (order) => {
            const customer = await db.select().from(customers).where(eq(customers.id, order.customerId)).limit(1);
            return {
              ...order,
              customer: customer[0],
            };
          })
        );

        return ordersWithCustomers.slice(input.offset, input.offset + input.limit);
      }),

    customersList: protectedProcedure
      .input(z.object({
        limit: z.number().default(50),
        offset: z.number().default(0),
      }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error('Database not available');

        const allCustomers = await db.select().from(customers);
        const customersWithOrders = await Promise.all(
          allCustomers.map(async (customer) => {
            const customerOrders = await db.select().from(orders).where(eq(orders.customerId, customer.id));
            return {
              ...customer,
              totalOrders: customerOrders.length,
              totalSpent: customerOrders.reduce((sum, o) => sum + o.totalPrice, 0) / 100,
            };
          })
        );

        return customersWithOrders.slice(input.offset, input.offset + input.limit);
      }),

    abandonedCarts: protectedProcedure
      .input(z.object({
        limit: z.number().default(50),
        offset: z.number().default(0),
      }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error('Database not available');

        const pendingOrders = await db.select().from(orders).where(eq(orders.status, 'pending'));
        const ordersWithCustomers = await Promise.all(
          pendingOrders.map(async (order) => {
            const customer = await db.select().from(customers).where(eq(customers.id, order.customerId)).limit(1);
            return {
              ...order,
              customer: customer[0],
            };
          })
        );

        return ordersWithCustomers.slice(input.offset, input.offset + input.limit);
      }),

    orderDetails: protectedProcedure
      .input(z.object({
        orderId: z.number(),
      }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error('Database not available');

        const order = await db.select().from(orders).where(eq(orders.id, input.orderId)).limit(1);
        if (!order.length) throw new Error('Order not found');

        const customer = await db.select().from(customers).where(eq(customers.id, order[0].customerId)).limit(1);
        const payments = await db.select().from(paymentHistory).where(eq(paymentHistory.orderId, input.orderId));

        return {
          order: order[0],
          customer: customer[0],
          payments,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
