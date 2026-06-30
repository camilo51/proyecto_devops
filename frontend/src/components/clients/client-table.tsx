"use client";

import { Pencil, Trash2 } from "lucide-react";

import { Client } from "@/types/client";

type Props = {
  clients: Client[];
};

export function ClientTable({ clients }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-white">
      <table className="w-full">
        <thead className="bg-surface">
          <tr>
            <th className="px-8 py-5 text-left font-medium">Nombre</th>

            <th className="px-8 py-5 text-left font-medium">Correo</th>

            <th className="px-8 py-5 text-left font-medium">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="border-t border-border">
              <td className="px-8 py-6">
                {client.firstName} {client.lastName}
              </td>

              <td className="px-8 py-6">{client.email}</td>

              <td className="px-8 py-6">
                <div className="flex gap-3">
                  <button className="rounded-xl bg-gold p-3 text-white">
                    <Pencil size={18} />
                  </button>

                  <button className="rounded-xl bg-red-600 p-3 text-white">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
