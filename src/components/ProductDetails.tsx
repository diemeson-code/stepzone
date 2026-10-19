
"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/data/products";

type ProductDetailsProps = {
  produto: Product;
};

export default function ProductDetails({
  produto,
}: ProductDetailsProps) {
  const { adicionarItem } = useCart();
  const [adicionado, setAdicionado] = useState(false);

  function handleAdicionar() {
    adicionarItem(produto);
    setAdicionado(true);

    window.setTimeout(() => {
      setAdicionado(false);
    }, 2000);
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
        <img
          src={produto.image}
          alt={produto.name}
          className="h-80 w-full object-cover sm:h-[480px]"
        />
      </div>

      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-lime-400">
          {produto.category}
        </p>

        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          {produto.name}
        </h1>

        <p className="mt-6 text-3xl font-black text-lime-400">
          {produto.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>

        <p className="mt-6 text-lg leading-8 text-slate-400">
          {produto.description}
        </p>

        <button
          type="button"
          onClick={handleAdicionar}
          className="mt-8 w-full rounded-full bg-lime-400 px-7 py-4 font-bold text-slate-950 transition hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-slate-950 sm:w-auto"
        >
          {adicionado ? "✓ Adicionado ao carrinho!" : "Adicionar ao carrinho"}
        </button>

        <p className="mt-3 text-sm text-slate-500">
          Seu estilo, seu conforto, seu próximo passo.
        </p>
      </div>
    </div>
  );
}
