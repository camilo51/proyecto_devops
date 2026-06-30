"use client";

import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { ClientEmpty } from "@/components/clients/client-empty";
import { ClientSearch } from "@/components/clients/client-search";
import { ClientTable } from "@/components/clients/client-table";
import { ClientService } from "@/services/client.service";
import { Client } from "@/types/client";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    const response = await ClientService.findAll();

    setClients(response);
  }

  const filteredClients = useMemo(() => {
    return clients.filter((client) =>
      `${client.firstName} ${client.lastName} ${client.email}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [clients, search]);

  return (
    <main>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-5xl text-foreground">Clientes</h1>

          <p className="mt-2 text-muted">
            Administra todos los clientes registrados.
          </p>
        </div>

        <button className="flex items-center gap-3 rounded-2xl bg-accent px-6 py-4 text-white transition hover:bg-accent-hover">
          <Plus size={20} />
          Nuevo cliente
        </button>
      </div>

      <div className="mb-8">
        <ClientSearch value={search} onChange={setSearch} />
      </div>

      {filteredClients.length === 0 ? (
        <ClientEmpty />
      ) : (
        <ClientTable clients={filteredClients} />
      )}
    </main>
  );
}
