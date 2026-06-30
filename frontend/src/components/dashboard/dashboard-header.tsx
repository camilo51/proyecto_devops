export function DashboardHeader() {
  const today = new Intl.DateTimeFormat("es-CO", {
    dateStyle: "full",
  }).format(new Date());

  return (
    <section className="flex items-end justify-between">
      <div>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
          Dashboard
        </span>

        <h1 className="mt-4 font-heading text-5xl text-foreground">
          Resumen general
        </h1>

        <p className="mt-3 text-muted">
          Visualiza el estado actual de tu despacho.
        </p>
      </div>

      <div className="hidden rounded-2xl border border-border bg-white px-6 py-4 lg:block">
        <p className="font-mono text-xs uppercase text-muted">Hoy</p>

        <p className="mt-1 capitalize text-foreground">{today}</p>
      </div>
    </section>
  );
}
