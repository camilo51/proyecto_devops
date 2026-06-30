"use client";

import { toast } from "sonner";

import { ClientService } from "@/services/client.service";
import { Client } from "@/types/client";

type Props = {
  client: Client | null;
  onClose: () => void;
  onSuccess: () => void;
};

export function DeleteClientModal({ client, onClose, onSuccess }: Props) {
  if (!client) return null;

  async function remove() {
    try {
      await ClientService.remove(client!.id);

      toast.success("Cliente eliminado");

      onSuccess();

      onClose();
    } catch {
      toast.error("No fue posible eliminar el cliente");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-3xl bg-white p-8">
        <h2 className="font-heading text-3xl text-foreground">
          Eliminar cliente
        </h2>

        <p className="mt-5 text-muted">
          ¿Deseas eliminar a{" "}
          <strong>
            {client.firstName} {client.lastName}
          </strong>
          ?
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-border px-5 py-3"
          >
            Cancelar
          </button>

          <button
            onClick={remove}
            className="rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
