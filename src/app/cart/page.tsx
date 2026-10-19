
"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const {
    items,
    carregado,
    removerItem,
    atualizarQuantidade,
    subtotal,
  } = useCart();

  const formatarPreco = (valor: number) =>
    valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <Link
          href="/"
          className="text-sm font-medium text-lime-400 transition hover:text-lime-300"
        >
          ← Continuar comprando
        </Link>

        <h1 className="mt-6 text-4xl font-black sm:text-5xl">
          Meu carrinho
        </h1>

        <p className="mt-3 text-slate-400">
          Confira seus produtos antes de finalizar a compra.
        </p>

        {!carregado ? (
          <p className="mt-10 text-slate-400">Carregando carrinho...</p>
        ) : items.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900 p-10 text-center">
            <h2 className="text-2xl font-bold">
              Seu carrinho está vazio
            </h2>

            <p className="mt-3 text-slate-400">
              Explore nossa coleção e encontre seu próximo tênis.
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
            <div className="space-y-4 lg:col-span-2">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-slate-900 p-5 sm:flex-row sm:items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-36 w-full rounded-xl object-cover sm:w-40"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-lime-400">
                      {item.category}
                    </p>

                    <h2 className="mt-1 text-xl font-bold">
                      {item.name}
                    </h2>

                    <p className="mt-2 font-bold">
                      {formatarPreco(item.price)}
                    </p>

                    <button
                      type="button"
                      onClick={() => removerItem(item.id)}
                      className="mt-3 text-sm text-red-400 transition hover:text-red-300"
                    >
                      Remover produto
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label={`Diminuir quantidade de ${item.name}`}
                      onClick={() =>
                        atualizarQuantidade(item.id, item.quantity - 1)
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-lime-400 hover:text-lime-400"
                    >
                      −
                    </button>

                    <span className="min-w-6 text-center font-bold">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      aria-label={`Aumentar quantidade de ${item.name}`}
                      onClick={() =>
                        atualizarQuantidade(item.id, item.quantity + 1)
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-lime-400 hover:text-lime-400"
                    >
                      +
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="rounded-2xl border border-white/10 bg-slate-900 p-6 lg:sticky lg:top-28">
              <h2 className="text-xl font-bold">Resumo do pedido</h2>

              <div className="mt-6 flex justify-between gap-4 text-slate-400">
                <span>Produtos</span>
                <span>
                  {items.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </div>

              <div className="mt-4 flex justify-between gap-4 text-slate-400">
                <span>Subtotal</span>
                <span>{formatarPreco(subtotal)}</span>
              </div>

              <div className="my-6 border-t border-white/10" />

              <div className="flex justify-between gap-4 text-lg font-black">
                <span>Total</span>
                <span className="text-lime-400">
                  {formatarPreco(subtotal)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="mt-6 flex w-full justify-center rounded-full bg-lime-400 px-6 py-4 text-center font-bold text-slate-950 transition hover:bg-lime-300"
              >
                Finalizar compra
              </Link>

              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                Frete e pagamento serão definidos nas próximas etapas.
              </p>
            </aside>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
