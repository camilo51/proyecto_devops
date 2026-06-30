const activities = [
  {
    title: "Nuevo cliente registrado",
    subtitle: "Juan Pérez",
  },
  {
    title: "Caso actualizado",
    subtitle: "Demanda civil",
  },
  {
    title: "Cliente completó su registro",
    subtitle: "María Gómez",
  },
];

export function RecentActivity() {
  return (
    <section className="rounded-3xl border border-border bg-white p-8">
      <h2 className="font-heading text-3xl text-foreground">
        Actividad reciente
      </h2>

      <div className="mt-8 space-y-5">
        {activities.map((activity) => (
          <div
            key={activity.title}
            className="flex items-center justify-between rounded-2xl bg-background p-5"
          >
            <div>
              <h3 className="font-medium text-foreground">{activity.title}</h3>

              <p className="mt-1 text-sm text-muted">{activity.subtitle}</p>
            </div>

            <span className="font-mono text-xs uppercase text-muted">Hoy</span>
          </div>
        ))}
      </div>
    </section>
  );
}
