import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: number;
  icon: ReactNode;
};

export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <article className="rounded-3xl border border-border bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="rounded-2xl bg-accent p-4 text-white">{icon}</div>

        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Total
        </span>
      </div>

      <h3 className="mt-8 text-muted">{title}</h3>

      <h2 className="mt-2 font-heading text-5xl text-foreground">{value}</h2>
    </article>
  );
}
