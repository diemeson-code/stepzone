

import { Suspense } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

type Pedido = {
  itens: {
    id: string;
    name: string;
    quantity: number;
  }[];
  total: number;
  pagamento: "pix" | "credito" | "debito";
  data: string;
};

const formasPagamento = {
  pix: "Pix",
  credito: "Cartão de crédito",
  debito: "Cartão de débito",
};

function Confirmacao() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-lime-400 text-5xl font-black text-slate-950">
        ✓
      </div>

      <p className="mt-8 font-bold uppercase tracking-[0.25em] text-lime-400">
        Pedido confirmado
      </p>

      <h1 className="mt-4 text-4xl font-black sm:text-5xl">
        Obrigado pela sua compra!
      </h1>

      <p className="mt-5 max-w-xl leading-7 text-slate-400">
        Sua compra de demonstração foi registrada. Nenhum pagamento real foi realizado.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-full bg-lime-400 px-7 py-4 font-bold text-slate-950 transition hover:bg-lime-300"
      >
        Continuar comprando
      </Link>
    </section>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />
      <Suspense
        fallback={
          <p className="px-6 py-20 text-center text-slate-400">
            Carregando confirmação...
          </p>
        }
      >
        <Confirmacao />
      </Suspense>
      <Footer />
    </main>
  );
}
