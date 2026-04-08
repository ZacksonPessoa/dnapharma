"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const unitPrice = 97.0;
  const total = unitPrice * quantity;

  const handleBuyNow = () => {
    router.push(`/checkout?qty=${quantity}`);
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="px-6 py-12 max-w-md mx-auto text-center space-y-6">
        <h1 className="text-3xl font-bold">Landing do Produto</h1>

        <p className="text-gray-600">
          Aqui vamos apresentar o produto, seus benefícios e características.
        </p>

        <div className="rounded-2xl border p-6 space-y-4 shadow-sm">
          <h2 className="text-2xl font-semibold">Oferta final</h2>

          <p className="text-gray-600">
            Escolha a quantidade e clique em <strong>Buy now</strong> para
            iniciar seu pedido.
          </p>

          <div className="space-y-2 text-left">
            <label className="block text-sm font-medium">Quantidade</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full rounded-xl border px-4 py-3"
            >
              <option value={1}>1 unidade</option>
              <option value={2}>2 unidades</option>
              <option value={3}>3 unidades</option>
              <option value={4}>4 unidades</option>
              <option value={5}>5 unidades</option>
            </select>
          </div>

          <div className="rounded-xl bg-gray-50 p-4 text-left space-y-1">
            <p className="text-sm text-gray-500">Preço unitário</p>
            <p className="font-medium">R$ {unitPrice.toFixed(2)}</p>

            <p className="text-sm text-gray-500 pt-2">Total</p>
            <p className="text-2xl font-bold">R$ {total.toFixed(2)}</p>
          </div>

          <button
            onClick={handleBuyNow}
            className="w-full rounded-2xl bg-black text-white py-4 text-lg font-semibold hover:opacity-90 transition"
          >
            Buy now
          </button>
        </div>
      </section>
    </main>
  );
}