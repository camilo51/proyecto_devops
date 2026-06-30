import { FolderOpen } from "lucide-react";

export function CaseEmpty() {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-border bg-white py-24">
      <FolderOpen size={60} className="text-muted" />

      <h2 className="mt-6 font-heading text-3xl text-foreground">
        No hay casos registrados
      </h2>

      <p className="mt-3 text-muted">Crea el primer caso para comenzar.</p>
    </div>
  );
}
