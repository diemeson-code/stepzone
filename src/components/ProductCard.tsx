

import Link from "next/link";

type ProductCardProps = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
};

export default function ProductCard({
  id,
  name,
  category,
  price,
  image,
}: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/product/${id}`} className="block">
        <div className="flex h-56 items-center justify-center overflow-hidden bg-slate-800">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-5">
          <p className="text-sm font-medium text-lime-400">{category}</p>

          <h3 className="mt-2 text-lg font-bold text-white transition group-hover:text-lime-400">
            {name}
          </h3>

          <p className="mt-3 text-xl font-black text-white">
            {price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          <span className="mt-4 inline-block text-sm font-bold text-lime-400">
            Ver detalhes →
          </span>
        </div>
      </Link>
    </article>
  );
}
