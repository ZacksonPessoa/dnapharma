"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const qtyParam = searchParams.get("qty");
  const quantity = Number(qtyParam) > 0 ? Number(qtyParam) : 1;

  const productName = "Produto do Lançamento";
  const unitPrice = 97.0;
  const total = unitPrice * quantity;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOrder = async () => {
    if (!name || !phone || !email) {
      alert("Preencha nome, telefone e email.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          quantity,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Erro ao enviar pedido");
      }

      router.push(
        `/success?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&qty=${quantity}`
      );
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar pedido. Verifique o backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black p-6">
      <section className="max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-gray-600">
            Revise o pedido e preencha seus dados.
          </p>
        </div>

        <div className="rounded-2xl border p-5 shadow-sm space-y-3">
          <h2 className="text-xl font-semibold">Resumo do pedido</h2>

          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">Produto:</span> {productName}
            </p>
            <p>
              <span className="font-medium">Quantidade:</span> {quantity}
            </p>
            <p>
              <span className="font-medium">Preço unitário:</span> R$ {unitPrice.toFixed(2)}
            </p>
          </div>

          <div className="border-t pt-3">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold">R$ {total.toFixed(2)}</p>
          </div>
        </div>

        <div className="rounded-2xl border p-5 shadow-sm space-y-4">
          <h2 className="text-xl font-semibold">Seus dados</h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Nome completo</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Telefone</label>
            <input
              type="tel"
              placeholder="Digite seu telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <button
            type="button"
            onClick={handleSendOrder}
            disabled={loading}
            className="w-full rounded-2xl bg-black text-white py-4 text-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar pedido"}
          </button>
        </div>
      </section>
    </main>
  );
}