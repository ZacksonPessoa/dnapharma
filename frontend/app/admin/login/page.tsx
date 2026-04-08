"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Preencha email e senha.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Erro no login");
      }

      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_email", data.admin.email);

      router.push("/admin/orders");
    } catch (error) {
      console.error("Erro no login admin:", error);
      alert("Login inválido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black p-6 flex items-center justify-center">
      <section className="w-full max-w-md rounded-2xl border p-6 space-y-5">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login do Admin</h1>
          <p className="text-gray-600">
            Acesse o painel administrativo do lançamento.
          </p>
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

        <div className="space-y-2">
          <label className="block text-sm font-medium">Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-2xl bg-black text-white py-4 text-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </section>
    </main>
  );
}