import { Scale } from "lucide-react";

export function LoginBanner() {
  return (
    <section className="relative hidden overflow-hidden bg-primary text-white lg:flex lg:flex-col lg:justify-between">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(181,83,44,.25),transparent_45%)]" />

      <div className="relative z-10 flex items-center gap-4 p-12">
        <div className="rounded-2xl bg-accent p-4">
          <Scale size={32} />
        </div>

        <div>
          <h1 className="font-heading text-4xl">Sabrin</h1>
        </div>
      </div>

      <div className="relative z-10 px-12">
        <h2 className="max-w-xl font-heading text-6xl leading-tight">
          Administra clientes y casos jurídicos desde un solo lugar.
        </h2>

        <p className="mt-8 max-w-lg text-lg leading-8 text-white/70">
          Una plataforma diseñada para abogados que buscan organizar su
          información de manera sencilla, elegante y profesional.
        </p>
      </div>

      <div className="relative z-10 p-12">
        <p className="font-mono text-sm text-white/50">© 2026 Sabrin</p>
      </div>
    </section>
  );
}
