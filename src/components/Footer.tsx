
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/"
            className="text-xl font-black tracking-tight text-lime-400"
          >
            StepZone<span className="text-white">.</span>
          </Link>

          <p className="mt-2 text-sm text-slate-400">
            Seu próximo passo começa aqui.
          </p>
        </div>

        <p className="text-sm text-slate-500">
          © 2026 StepZone. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
