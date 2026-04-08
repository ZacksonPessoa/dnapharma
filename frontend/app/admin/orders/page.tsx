"use client";

import { useEffect, useState } from "react";

type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
};

type Order = {
  id: number;
  customerId: number;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  customer: Customer;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3333/orders");
        const data = await response.json();

        if (data.ok) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <main className="min-h-screen bg-white text-black p-6">
      <section className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Pedidos</h1>
          <p className="text-gray-600">
            Painel simples para visualizar os pedidos do lançamento.
          </p>
        </div>

        {loading ? (
          <p>Carregando pedidos...</p>
        ) : orders.length === 0 ? (
          <p>Nenhum pedido encontrado.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Cliente</th>
                  <th className="p-3 text-left">Telefone</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Qtd</th>
                  <th className="p-3 text-left">Total</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Data</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="p-3">{order.id}</td>
                    <td className="p-3">{order.customer.name}</td>
                    <td className="p-3">{order.customer.phone}</td>
                    <td className="p-3">{order.customer.email}</td>
                    <td className="p-3">{order.quantity}</td>
                    <td className="p-3">R$ {order.totalAmount.toFixed(2)}</td>
                    <td className="p-3">{order.status}</td>
                    <td className="p-3">
                      {new Date(order.createdAt).toLocaleString("pt-BR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}