export function Navbar() {
  return (
    <header className="flex h-24 items-center justify-between border-b border-border bg-white px-10">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Sabrin
        </p>

        <h2 className="mt-2 font-heading text-3xl text-foreground">
          Panel Administrativo
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-foreground">Cristian Pereira</p>

          <span className="text-sm text-muted">Abogado</span>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent font-semibold text-white">
          C
        </div>
      </div>
    </header>
  );
}
