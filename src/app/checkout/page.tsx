
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";

type FormaPagamento = "pix" | "credito" | "debito";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, carregado, subtotal } = useCart();
  const [pagamento, setPagamento] = useState<FormaPagamento>("pix");
  const [confirmando, setConfirmando] = useState(false);

  const formatarPreco = (valor: number) =>
    valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  function confirmarCompra() {
    if (items.length === 0 || confirmando) return;

    setConfirmando(true);

    const pedido = {
      itens: items,
      total: subtotal,
      pagamento,
      data: new Date().toISOString(),
    };

    try {
      sessionStorage.setItem("stepzone-pedido", JSON.stringify(pedido));
      router.push("/success");
    } catch {
      setConfirmando(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <Link
          href="/cart"
          className="text-sm font-medium text-lime-400 transition hover:text-lime-300"
        >
          ← Voltar ao carrinho
        </Link>

        <h1 className="mt-6 text-4xl font-black sm:text-5xl">
          Finalizar compra
        </h1>

        <p className="mt-3 text-slate-400">
          Escolha uma forma de pagamento para simular seu pedido.
        </p>

        {!carregado ? (
          <p className="mt-10 text-slate-400">Carregando pedido...</p>
        ) : items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900 p-8">
            <h2 className="text-xl font-bold">
              Seu carrinho está vazio
            </h2>
            <p className="mt-3 text-slate-400">
              Adicione algum produto antes de finalizar a compra.
            </p>
            <Link
              href="/#produtos"
              className="mt-6 inline-flex rounded-full bg-lime-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-lime-300"
            >
              Explorar produtos
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            <section className="rounded-2xl border border-white/10 bg-slate-900 p-6 lg:col-span-2">
              <h2 className="text-2xl font-bold">
                Forma de pagamento
              </h2>

              <div className="mt-6 space-y-4">
                <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-white/10 p-4 transition hover:border-lime-400">
                  <input
                    type="radio"
                    name="pagamento"
                    value="pix"
                    checked={pagamento === "pix"}
                    onChange={() => setPagamento("pix")}
                    className="accent-lime-400"
                  />
                  <div>
                    <p className="font-bold">Pix</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Pagamento simulado por Pix.
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-white/10 p-4 transition hover:border-lime-400">
                  <input
                    type="radio"
                    name="pagamento"
                    value="credito"
                    checked={pagamento === "credito"}
                    onChange={() => setPagamento("credito")}
                    className="accent-lime-400"
                  />
                  <div>
                    <p className="font-bold">Cartão de crédito</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Sem inserir dados reais do cartão.
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-white/10 p-4 transition hover:border-lime-400">
                  <input
                    type="radio"
                    name="pagamento"
                    value="debito"
                    checked={pagamento === "debito"}
                    onChange={() => setPagamento("debito")}
                    className="accent-lime-400"
                  />
                  <div>
                    <p className="font-bold">Cartão de débito</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Pagamento simulado por débito.
                    </p>
                  </div>
                </label>
              </div>
            </section>

            <aside className="rounded-2xl border border-white/10 bg-slate-900 p-6 lg:sticky lg:top-28">
              <h2 className="text-xl font-bold">Resumo do pedido</h2>

              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <span className="text-slate-400">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="shrink-0 font-medium">
                      {formatarPreco(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="my-6 border-t border-white/10" />

              <div className="flex justify-between gap-4 text-lg font-black">
                <span>Total</span>
                <span className="text-lime-400">
                  {formatarPreco(subtotal)}
                </span>
              </div>

              <button
                type="button"
                onClick={confirmarCompra}
                disabled={confirmando}
                className="mt-6 w-full rounded-full bg-lime-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {confirmando ? "Confirmando..." : "Confirmar pedido"}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                Esta é uma demonstração. Nenhuma cobrança será realizada.
              </p>
            </aside>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
