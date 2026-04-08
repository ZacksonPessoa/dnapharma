"use client";

import Link from "next/link";
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

type OrderDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const [orderId, setOrderId] = useState<string>("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadParamsAndFetch = async () => {
      const resolvedParams = await params;
      const id = resolvedParams.id;
      setOrderId(id);

      try {
        const response = await fetch(`http://localhost:3333/orders/${id}`);
        const data = await response.json();

        if (data.ok) {
          setOrder(data.order);
        }
      } catch (error) {
        console.error("Erro ao buscar pedido:", error);
      } finally {
        setLoading(false);
      }
    };

    loadParamsAndFetch();
  }, [params]);

  return (
    <main className="min-h-screen bg-white text-black p-6">
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Detalhes do pedido #{orderId}
            </h1>
            <p className="text-gray-600">
              Visualização detalhada do pedido selecionado.
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="rounded-xl border px-4 py-2 font-medium hover:bg-gray-100"
          >
            Voltar
          </Link>
        </div>

        {loading ? (
          <p>Carregando pedido...</p>
        ) : !order ? (
          <p>Pedido não encontrado.</p>
        ) : (
          <div className="space-y-6">
            <div className="rounded-2xl border p-5 space-y-3">
              <h2 className="text-xl font-semibold">Informações do pedido</h2>

              <div className="grid gap-3 sm:grid-cols-2">
                <p>
                  <span className="font-medium">ID:</span> {order.id}
                </p>
                <p>
                  <span className="font-medium">Status:</span> {order.status}
                </p>
                <p>
                  <span className="font-medium">Quantidade:</span>{" "}
                  {order.quantity}
                </p>
                <p>
                  <span className="font-medium">Preço unitário:</span> R${" "}
                  {order.unitPrice.toFixed(2)}
                </p>
                <p>
                  <span className="font-medium">Total:</span> R${" "}
                  {order.totalAmount.toFixed(2)}
                </p>
                <p>
                  <span className="font-medium">Data:</span>{" "}
                  {new Date(order.createdAt).toLocaleString("pt-BR")}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border p-5 space-y-3">
              <h2 className="text-xl font-semibold">Dados do cliente</h2>

              <div className="grid gap-3 sm:grid-cols-2">
                <p>
                  <span className="font-medium">Nome:</span>{" "}
                  {order.customer.name}
                </p>
                <p>
                  <span className="font-medium">Telefone:</span>{" "}
                  {order.customer.phone}
                </p>
                <p className="sm:col-span-2">
                  <span className="font-medium">Email:</span>{" "}
                  {order.customer.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}