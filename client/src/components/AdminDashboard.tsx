import { useState } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { trpc } from '@/lib/trpc';
import { BarChart3, Users, ShoppingCart, TrendingUp, LogOut, Menu, X } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const kpisQuery = trpc.dashboard.kpis.useQuery();
  const salesQuery = trpc.dashboard.sales.useQuery({ limit: 100 });
  const customersQuery = trpc.dashboard.customersList.useQuery({ limit: 100 });
  const abandonedQuery = trpc.dashboard.abandonedCarts.useQuery({ limit: 100 });

  const handleLogout = async () => {
    await logout();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h1 className="font-bold text-lg">BeautyVida Admin</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-800 rounded">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2">
          {[
            { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
            { id: 'sales', label: 'Vendas', icon: ShoppingCart },
            { id: 'customers', label: 'Clientes', icon: Users },
            { id: 'abandoned', label: 'Carrinhos Abandonados', icon: TrendingUp },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded transition-colors ${
                  activeTab === item.id ? 'bg-blue-600' : 'hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Sair</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
              <p className="text-slate-600">Bem-vindo, {user?.name}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="hidden" />

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpisQuery.isLoading ? (
                  <div className="col-span-4 text-center py-8">Carregando...</div>
                ) : kpisQuery.data ? (
                  <>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Total de Pedidos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{kpisQuery.data.totalOrders}</div>
                        <p className="text-xs text-slate-500 mt-1">{kpisQuery.data.paidOrders} pagos</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Receita Total</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(kpisQuery.data.totalRevenue)}</div>
                        <p className="text-xs text-slate-500 mt-1">{kpisQuery.data.paidOrders} vendas</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Ticket Médio</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(kpisQuery.data.averageOrderValue)}</div>
                        <p className="text-xs text-slate-500 mt-1">Por venda</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Pendentes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-orange-600">{kpisQuery.data.pendingOrders}</div>
                        <p className="text-xs text-slate-500 mt-1">Aguardando pagamento</p>
                      </CardContent>
                    </Card>
                  </>
                ) : null}
              </div>
            </TabsContent>

            {/* Sales Tab */}
            <TabsContent value="sales" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Vendas Realizadas</CardTitle>
                  <CardDescription>Histórico de pedidos pagos</CardDescription>
                </CardHeader>
                <CardContent>
                  {salesQuery.isLoading ? (
                    <div className="text-center py-8">Carregando...</div>
                  ) : salesQuery.data && salesQuery.data.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-2 px-4">ID</th>
                            <th className="text-left py-2 px-4">Cliente</th>
                            <th className="text-left py-2 px-4">Email</th>
                            <th className="text-left py-2 px-4">Valor</th>
                            <th className="text-left py-2 px-4">Data</th>
                          </tr>
                        </thead>
                        <tbody>
                          {salesQuery.data.map((order) => (
                            <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50">
                              <td className="py-3 px-4">#{order.id}</td>
                              <td className="py-3 px-4">{order.customer?.name}</td>
                              <td className="py-3 px-4">{order.customer?.email}</td>
                              <td className="py-3 px-4 font-semibold">{formatCurrency(order.totalPrice / 100)}</td>
                              <td className="py-3 px-4">{formatDate(order.createdAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500">Nenhuma venda realizada ainda</div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Customers Tab */}
            <TabsContent value="customers" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Clientes</CardTitle>
                  <CardDescription>Lista de clientes que compraram</CardDescription>
                </CardHeader>
                <CardContent>
                  {customersQuery.isLoading ? (
                    <div className="text-center py-8">Carregando...</div>
                  ) : customersQuery.data && customersQuery.data.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-2 px-4">Nome</th>
                            <th className="text-left py-2 px-4">Email</th>
                            <th className="text-left py-2 px-4">Telefone</th>
                            <th className="text-left py-2 px-4">Pedidos</th>
                            <th className="text-left py-2 px-4">Total Gasto</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customersQuery.data.map((customer) => (
                            <tr key={customer.id} className="border-b border-slate-100 hover:bg-slate-50">
                              <td className="py-3 px-4">{customer.name}</td>
                              <td className="py-3 px-4">{customer.email}</td>
                              <td className="py-3 px-4">{customer.phone}</td>
                              <td className="py-3 px-4">{customer.totalOrders}</td>
                              <td className="py-3 px-4 font-semibold">{formatCurrency(customer.totalSpent)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500">Nenhum cliente ainda</div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Abandoned Carts Tab */}
            <TabsContent value="abandoned" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Carrinhos Abandonados</CardTitle>
                  <CardDescription>Pedidos pendentes de pagamento</CardDescription>
                </CardHeader>
                <CardContent>
                  {abandonedQuery.isLoading ? (
                    <div className="text-center py-8">Carregando...</div>
                  ) : abandonedQuery.data && abandonedQuery.data.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-2 px-4">ID</th>
                            <th className="text-left py-2 px-4">Cliente</th>
                            <th className="text-left py-2 px-4">Email</th>
                            <th className="text-left py-2 px-4">Valor</th>
                            <th className="text-left py-2 px-4">Data</th>
                          </tr>
                        </thead>
                        <tbody>
                          {abandonedQuery.data.map((order) => (
                            <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50">
                              <td className="py-3 px-4">#{order.id}</td>
                              <td className="py-3 px-4">{order.customer?.name}</td>
                              <td className="py-3 px-4">{order.customer?.email}</td>
                              <td className="py-3 px-4 font-semibold">{formatCurrency(order.totalPrice / 100)}</td>
                              <td className="py-3 px-4">{formatDate(order.createdAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500">Nenhum carrinho abandonado</div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
