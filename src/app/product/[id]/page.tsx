

import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetails from "@/components/ProductDetails";
import { products } from "@/data/products";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

async function ProductContent({ params }: ProductPageProps) {
  const { id } = await params;
  const produto = products.find((item) => item.id === id);

  if (!produto) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <Link
        href="/"
        className="text-sm font-medium text-lime-400 transition hover:text-lime-300"
      >
        ← Voltar para a coleção
      </Link>

      <div className="mt-8">
        <ProductDetails produto={produto} />
      </div>
    </section>
  );
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />

      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-6 py-12 text-slate-400">
            Carregando produto...
          </div>
        }
      >
        <ProductContent params={params} />
      </Suspense>

      <Footer />
    </main>
  );
}
