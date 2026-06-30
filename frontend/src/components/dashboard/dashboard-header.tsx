import { CalendarDays } from "lucide-react";

export function DashboardHeader() {
  const today = new Intl.DateTimeFormat("es-CO", {
    dateStyle: "full",
  }).format(new Date());

  return (
    <section className="flex items-center justify-between">
      <div>
        <span className="font-mono text-sm uppercase tracking-widest text-muted">
          Dashboard
        </span>

        <h1 className="mt-3 font-heading text-5xl text-foreground">
          Bienvenido, Cristian.
        </h1>

        <p className="mt-3 max-w-xl text-muted">
          Administra tus clientes y casos jurídicos desde un único lugar.
        </p>
      </div>

      <div className="hidden items-center gap-3 rounded-2xl border border-border bg-white px-5 py-4 lg:flex">
        <CalendarDays size={22} className="text-accent" />

        <div>
          <p className="font-mono text-xs uppercase text-muted">Hoy</p>

          <p className="font-medium text-foreground capitalize">{today}</p>
        </div>
      </div>
    </section>
  );
}
