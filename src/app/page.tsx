

"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function Home() {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas");

  const categorias = [
    "Todas",
    ...Array.from(new Set(products.map((produto) => produto.category))),
  ];

  const produtosFiltrados = products.filter((produto) => {
    const correspondeBusca = produto.name
      .toLowerCase()
      .includes(busca.toLowerCase());

    const correspondeCategoria =
      categoria === "Todas" || produto.category === categoria;

    return correspondeBusca && correspondeCategoria;
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <p className="mb-4 font-semibold uppercase tracking-[0.3em] text-lime-400">
          Step into your style
        </p>

        <h1 className="max-w-3xl text-5xl font-black tracking-tight sm:text-7xl">
          Seu próximo passo começa aqui.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
          Descubra uma nova experiência em estilo, conforto e movimento.
          Encontre o tênis ideal para você na StepZone.
        </p>

        <a
          href="#produtos"
          className="mt-8 inline-flex rounded-full bg-lime-400 px-7 py-3 font-bold text-slate-950 transition hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          Explorar coleção
        </a>
      </section>

      {/* Produtos */}
      <section
        id="produtos"
        className="border-t border-white/10 bg-slate-900 px-6 py-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-semibold uppercase tracking-widest text-lime-400">
                Nossa seleção
              </p>

              <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                Nossa coleção
              </h2>

              <p className="mt-3 text-slate-400">
                Estilo e conforto para acompanhar seus passos.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:w-80">
              <label htmlFor="busca" className="text-sm text-slate-300">
                Buscar produto
              </label>

              <input
                id="busca"
                type="search"
                value={busca}
                onChange={(evento) => setBusca(evento.target.value)}
                placeholder="Digite o nome do tênis..."
                className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-lime-400 focus:ring-1 focus:ring-lime-400"
              />
            </div>
          </div>

          {/* Filtros */}
          <div className="mt-8 flex flex-wrap gap-3">
            {categorias.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategoria(item)}
                aria-pressed={categoria === item}
                className={`rounded-full px-5 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-lime-400 ${
                  categoria === item
                    ? "bg-lime-400 text-slate-950"
                    : "border border-white/10 bg-slate-950 text-slate-300 hover:border-lime-400 hover:text-lime-400"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <p className="mt-6 text-sm text-slate-400">
            {produtosFiltrados.length} produto(s) encontrado(s)
          </p>

          {/* Lista de produtos */}
          {produtosFiltrados.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {produtosFiltrados.map((produto) => (
                <ProductCard
                  key={produto.id}
                  id={produto.id}
                  name={produto.name}
                  category={produto.category}
                  price={produto.price}
                  image={produto.image}
                />
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950 p-10 text-center">
              <h3 className="text-xl font-bold">
                Nenhum produto encontrado
              </h3>

              <p className="mt-2 text-slate-400">
                Tente outro nome ou selecione uma categoria diferente.
              </p>

              <button
                type="button"
                onClick={() => {
                  setBusca("");
                  setCategoria("Todas");
                }}
                className="mt-5 rounded-full bg-lime-400 px-5 py-2 font-bold text-slate-950 transition hover:bg-lime-300"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* StepZone+ */}
      <section className="px-6 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl border border-lime-400/20 bg-gradient-to-br from-slate-900 to-slate-800 p-8 sm:flex-row sm:items-center sm:p-12">
          <div>
            <p className="font-semibold uppercase tracking-widest text-lime-400">
              Um passo além
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Conheça o StepZone+
            </h2>

            <p className="mt-3 max-w-xl leading-7 text-slate-400">
              Mais estilo, mais conforto e novidades para acompanhar você.
            </p>
          </div>

          <a
            href="#produtos"
            className="shrink-0 rounded-full bg-lime-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-lime-300"
          >
            Ver coleção
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

