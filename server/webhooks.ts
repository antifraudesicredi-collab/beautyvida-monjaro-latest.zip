import { Router } from 'express';
import { getDb } from './db';
import { orders, paymentHistory } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const router = Router();

/**
 * Webhook endpoint para receber notificações de pagamento do Vega Checkout
 * POST /api/webhook/vega-checkout
 */
router.post('/vega-checkout', async (req, res) => {
  try {
    const { orderId, status, transactionId, amount, message } = req.body;

    console.log('[Webhook] Vega Checkout notification received:', {
      orderId,
      status,
      transactionId,
      amount,
    });

    // Validar dados obrigatórios
    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: orderId, status',
      });
    }

    const db = await getDb();
    if (!db) {
      return res.status(500).json({
        success: false,
        error: 'Database not available',
      });
    }

    // Buscar pedido
    const order = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
    if (!order.length) {
      console.warn('[Webhook] Order not found:', orderId);
      return res.status(404).json({
        success: false,
        error: 'Order not found',
      });
    }

    // Mapear status do Vega Checkout para nosso sistema
    let orderStatus: 'pending' | 'paid' | 'abandoned' | 'cancelled' = 'pending';
    if (status === 'approved' || status === 'confirmed' || status === 'completed') {
      orderStatus = 'paid';
    } else if (status === 'declined' || status === 'failed' || status === 'cancelled') {
      orderStatus = 'cancelled';
    }

    // Atualizar status do pedido
    await db.update(orders).set({ status: orderStatus }).where(eq(orders.id, orderId));

    // Criar registro de histórico de pagamento
    await db.insert(paymentHistory).values({
      orderId: orderId,
      status: status === 'approved' ? 'approved' : status === 'declined' ? 'declined' : 'processing',
      amount: amount || order[0].totalPrice,
      vegaCheckoutStatus: status,
      vegaCheckoutMessage: message,
      transactionId: transactionId,
    });

    console.log('[Webhook] Payment processed successfully:', {
      orderId,
      orderStatus,
      transactionId,
    });

    // Aqui você pode adicionar lógica adicional, como:
    // - Enviar email de confirmação
    // - Registrar no sistema de CRM
    // - Disparar notificação ao admin
    // - Iniciar processo de entrega

    res.json({
      success: true,
      message: 'Webhook processed successfully',
      orderId,
      newStatus: orderStatus,
    });
  } catch (error) {
    console.error('[Webhook] Error processing Vega Checkout notification:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

export default router;
