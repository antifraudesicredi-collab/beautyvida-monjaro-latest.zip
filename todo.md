# BeautyVida Monjaro - TODO

## Landing Page
- [x] Seção Hero com destaque do Monjaro e preço R$ 149,90
- [x] Informações sobre regulamentação ANVISA
- [x] Localização em São Paulo
- [x] Seção de vídeos do YouTube (placeholders)
- [x] Seção de benefícios do Monjaro
- [x] Seção de depoimentos
- [x] Seção de perguntas frequentes (FAQ)
- [x] Design responsivo e profissional
- [x] Botão "Comprar Agora" redirecionando para Vega Checkout

## Banco de Dados
- [x] Tabela de clientes
- [x] Tabela de pedidos
- [x] Tabela de histórico de pagamentos
- [ ] Adicionar funções de query para dashboard

## Dashboard Administrativo
- [x] Autenticação de admin (role-based)
- [x] Página principal com KPIs
- [x] Painel de vendas realizadas com tabela
- [x] Painel de clientes que compraram
- [x] Painel de pedidos não pagos (carrinho abandonado)
- [ ] Filtros e busca de pedidos
- [ ] Exportação de dados (CSV)
- [ ] Detalhes do cliente e pedido

## Sistema de Webhook
- [x] Endpoint POST /api/webhook/vega-checkout
- [x] Receber notificações de status de pagamento
- [x] Atualizar status de pedidos automaticamente
- [ ] Validação de segurança do webhook (assinatura)
- [x] Logging de webhooks recebidos

## Testes
- [ ] Testes unitários com Vitest
- [ ] Testes de webhook

## Deploy
- [ ] Checkpoint antes de publicar
- [ ] Publicar no Manus
