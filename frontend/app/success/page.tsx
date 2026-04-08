"use client";

import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const phone = searchParams.get("phone") || "";
  const qty = searchParams.get("qty") || "1";

  return (
    <main className="min-h-screen bg-white text-black p-6">
      <section className="max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Pedido recebido</h1>
          <p className="text-gray-600">
            Recebemos sua solicitação com sucesso.
          </p>
        </div>

        <div className="rounded-2xl border p-5 shadow-sm space-y-3">
          <h2 className="text-xl font-semibold">Resumo enviado</h2>

          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Nome:</span> {name}
            </p>
            <p>
              <span className="font-medium">Telefone:</span> {phone}
            </p>
            <p>
              <span className="font-medium">Email:</span> {email}
            </p>
            <p>
              <span className="font-medium">Quantidade:</span> {qty}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}