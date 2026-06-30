"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ClientService } from "@/services/client.service";
import { Client } from "@/types/client";

type Props = {
  open: boolean;
  client?: Client | null;
  onClose: () => void;
  onSuccess: () => void;
};

export function ClientModal({ open, client, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (client) {
      setFirstName(client.firstName);
      setLastName(client.lastName);
      setEmail(client.email);
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
    }
  }, [client]);

  if (!open) return null;

  async function saveClient() {
    try {
      setLoading(true);

      if (client) {
        await ClientService.update(client.id, {
          firstName,
          lastName,
          email,
        });

        toast.success("Cliente actualizado");
      } else {
        await ClientService.create({
          firstName,
          lastName,
          email,
        });

        toast.success("Cliente creado");
      }

      onSuccess();
      onClose();
    } catch {
      toast.error("No fue posible guardar el cliente");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8">
        <h2 className="font-heading text-4xl text-foreground">
          {client ? "Editar cliente" : "Nuevo cliente"}
        </h2>

        <div className="mt-8 space-y-5">
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Nombre"
            className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-accent"
          />

          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Apellido"
            className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-accent"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo"
            className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-accent"
          />
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-border px-5 py-3"
          >
            Cancelar
          </button>

          <button
            disabled={loading}
            onClick={saveClient}
            className="rounded-xl bg-accent px-5 py-3 text-white hover:bg-accent-hover"
          >
            {loading ? "Guardando..." : client ? "Actualizar" : "Crear cliente"}
          </button>
        </div>
      </div>
    </div>
  );
}
