
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-lime-400"
        >
          StepZone<span className="text-white">.</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="transition hover:text-lime-400">
            Início
          </Link>

          <Link
            href="/cart"
            className="rounded-full bg-lime-400 px-4 py-2 font-bold text-slate-950 transition hover:bg-lime-300"
          >
            Carrinho
          </Link>
        </nav>
      </div>
    </header>
  );
}

