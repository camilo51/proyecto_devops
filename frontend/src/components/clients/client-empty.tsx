import { Users } from "lucide-react";

export function ClientEmpty() {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-border bg-white py-24">
      <Users size={60} className="text-muted" />

      <h2 className="mt-6 font-heading text-3xl text-foreground">
        No hay clientes
      </h2>

      <p className="mt-3 text-muted">Comienza creando tu primer cliente.</p>
    </div>
  );
}
