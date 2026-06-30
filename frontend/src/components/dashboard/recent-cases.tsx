import { DashboardStats } from "@/types/dashboard";

type Props = {
  cases: DashboardStats["recentCases"];
};

export function RecentCases({ cases }: Props) {
  return (
    <section className="rounded-3xl border border-border bg-white p-8">
      <h2 className="font-heading text-3xl text-foreground">Casos recientes</h2>

      <div className="mt-6 space-y-5">
        {cases.map((legalCase) => (
          <div key={legalCase.id} className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{legalCase.title}</h3>

              <p className="text-sm text-muted">{legalCase.status}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
