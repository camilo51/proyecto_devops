import { DashboardStats } from "@/types/dashboard";

type Props = {
  clients: DashboardStats["recentClients"];
};

export function RecentClients({ clients }: Props) {
  return (
    <section className="rounded-3xl border border-border bg-white p-8">
      <h2 className="font-heading text-3xl text-foreground">
        Clientes recientes
      </h2>

      <div className="mt-6 space-y-5">
        {clients.map((client) => (
          <div key={client.id} className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">
                {client.firstName} {client.lastName}
              </h3>

              <p className="text-sm text-muted">{client.email}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
