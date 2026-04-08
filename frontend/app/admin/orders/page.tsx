"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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

const STATUS_OPTIONS = ["NEW", "CONTACTED", "PAID", "CANCELLED"];
const FILTER_OPTIONS = ["ALL", ...STATUS_OPTIONS];

function getStatusBadgeClass(status: string) {
  switch (status) {
    case "NEW":
      return "bg-blue-100 text-blue-800";
    case "CONTACTED":
      return "bg-yellow-100 text-yellow-800";
    case "PAID":
      return "bg-green-100 text-green-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function AdminOrdersPage() {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchOrders = async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await fetch("http://localhost:3333/orders");
      const data = await response.json();

      if (data.ok) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      alert("Erro ao buscar pedidos.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    setAuthorized(true);
    fetchOrders();
  }, [router]);

  const handleStatusChange = async (orderId: number, status: string) => {
    try {
      setUpdatingId(orderId);

      const response = await fetch(
        `http://localhost:3333/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Erro ao atualizar status");
      }

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro ao atualizar status do pedido.");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = useMemo(() => {
    if (statusFilter === "ALL") return orders;
    return orders.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  if (!authorized) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Verificando acesso...</p>
      </main>
    );
  }
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_email");
    window.location.replace("/admin/login");
  };

  return (
    <main className="min-h-screen bg-white text-black p-6">
      <section className="max-w-6xl mx-auto space-y-6">
        <div className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
                <h1 className="text-3xl font-bold">Pedidos</h1>
                <p className="text-gray-600">
                Painel simples para visualizar e atualizar os pedidos do lançamento.
                </p>
            </div>

            <button
                onClick={handleLogout}
                className="rounded-xl border px-4 py-2 font-medium hover:bg-gray-100"
            >
                Sair
            </button>
            </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium">Filtrar por status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border px-3 py-2"
              >
                {FILTER_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option === "ALL" ? "Todos" : option}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => fetchOrders(true)}
              disabled={refreshing}
              className="rounded-xl border px-4 py-2 font-medium hover:bg-gray-100 disabled:opacity-50"
            >
              {refreshing ? "Atualizando..." : "Atualizar lista"}
            </button>
          </div>
        </div>

        {loading ? (
          <p>Carregando pedidos...</p>
        ) : filteredOrders.length === 0 ? (
          <p>Nenhum pedido encontrado para esse filtro.</p>
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
                  <th className="p-3 text-left">Alterar status</th>
                  <th className="p-3 text-left">Data</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="p-3">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-medium text-blue-600 underline"
                      >
                        {order.id}
                      </Link>
                    </td>
                    <td className="p-3">{order.customer.name}</td>
                    <td className="p-3">{order.customer.phone}</td>
                    <td className="p-3">{order.customer.email}</td>
                    <td className="p-3">{order.quantity}</td>
                    <td className="p-3">R$ {order.totalAmount.toFixed(2)}</td>
                    <td className="p-3">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        disabled={updatingId === order.id}
                        className="rounded-lg border px-3 py-2"
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
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