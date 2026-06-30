"use client";

import { Pencil, Trash2 } from "lucide-react";

import { Client } from "@/types/client";

type Props = {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
};

export function ClientTable({ clients, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-white">
      <table className="w-full">
        <thead className="bg-surface">
          <tr>
            <th className="px-8 py-5 text-left font-medium">Nombre</th>

            <th className="px-8 py-5 text-left font-medium">Correo</th>

            <th className="px-8 py-5 text-left font-medium">Estado</th>

            <th className="px-8 py-5 text-right font-medium">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="border-t border-border">
              <td className="px-8 py-6">
                <div>
                  <h3 className="font-medium text-foreground">
                    {client.firstName} {client.lastName}
                  </h3>

                  <span className="font-mono text-xs text-muted">
                    {client.id}
                  </span>
                </div>
              </td>

              <td className="px-8 py-6">{client.email}</td>

              <td className="px-8 py-6">
                {client.inviteToken ? (
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                    Pendiente
                  </span>
                ) : (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    Activo
                  </span>
                )}
              </td>

              <td className="px-8 py-6">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => onEdit(client)}
                    className="rounded-xl bg-gold p-3 text-white transition hover:opacity-80"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(client)}
                    className="rounded-xl bg-red-600 p-3 text-white transition hover:bg-red-700"
                  >
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
