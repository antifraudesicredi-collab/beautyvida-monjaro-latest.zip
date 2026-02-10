import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { customers, orders, paymentHistory } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { COOKIE_NAME } from "../shared/const";

export const appRouter = router({
  system: systemRouter,
  
  checkout: router({
    createOrder: publicProcedure
      .input(z.object({
        customerName: z.string(),
        customerEmail: z.string().email(),
        customerPhone: z.string(),
        street: z.string(),
        number: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
        complement: z.string().optional(),
        quantity: z.number().default(1),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error('Database not available');

        // Criar cliente
        const customerResult = await db.insert(customers).values({
          name: input.customerName,
          email: input.customerEmail,
          phone: input.customerPhone,
          street: input.street,
          number: input.number,
          city: input.city,
          state: input.state,
          zipCode: input.zipCode,
          complement: input.complement || '',
        });

        const customerId = (customerResult as any).insertId as number;

        // Criar pedido (R$ 149,90 = 14990 centavos)
        const unitPrice = 14990;
        const totalPrice = unitPrice * input.quantity;
        const orderResult = await db.insert(orders).values({
          customerId: customerId,
          quantity: input.quantity,
          unitPrice: unitPrice,
          totalPrice: totalPrice,
          status: 'pending',
        });

        const orderId = (orderResult as any).insertId as number;

        return {
          orderId: orderId,
          customerId: customerId,
          totalPrice: totalPrice / 100,
          vegaCheckoutUrl: `https://checkout.vegacheckout.com.br?orderId=${orderId}&amount=${totalPrice}`,
        };
      } ),
  }),

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
  }),
});
