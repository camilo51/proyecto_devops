"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { CaseService } from "@/services/case.service";
import { Case } from "@/types/case";

type Props = {
  open: boolean;
  legalCase?: Case | null;
  onClose: () => void;
  onSuccess: () => void;
};

export function CaseModal({ open, legalCase, onClose, onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    if (legalCase) {
      setTitle(legalCase.title);
      setDescription(legalCase.description);
      setClientId(legalCase.clientId);
    } else {
      setTitle("");
      setDescription("");
      setClientId("");
    }
  }, [legalCase]);

  if (!open) return null;

  async function saveCase() {
    try {
      if (legalCase) {
        await CaseService.update(legalCase.id, {
          title,
          description,
          status: legalCase.status,
        });

        toast.success("Caso actualizado");
      } else {
        await CaseService.create({
          title,
          description,
          clientId,
        });

        toast.success("Caso creado");
      }

      onSuccess();
      onClose();
    } catch {
      toast.error("No fue posible guardar el caso");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8">
        <h2 className="font-heading text-4xl">
          {legalCase ? "Editar caso" : "Nuevo caso"}
        </h2>

        <div className="mt-8 space-y-5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            className="w-full rounded-xl border border-border px-4 py-3"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción"
            rows={5}
            className="w-full rounded-xl border border-border px-4 py-3"
          />

          {!legalCase && (
            <input
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="ID Cliente"
              className="w-full rounded-xl border border-border px-4 py-3"
            />
          )}
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-border px-5 py-3"
          >
            Cancelar
          </button>

          <button
            onClick={saveCase}
            className="rounded-xl bg-accent px-5 py-3 text-white"
          >
            {legalCase ? "Actualizar" : "Crear caso"}
          </button>
        </div>
      </div>
    </div>
  );
}
