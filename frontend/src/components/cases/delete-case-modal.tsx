"use client";

import { toast } from "sonner";

import { CaseService } from "@/services/case.service";
import { Case } from "@/types/case";

type Props = {
  legalCase: Case | null;
  onClose: () => void;
  onSuccess: () => void;
};

export function DeleteCaseModal({ legalCase, onClose, onSuccess }: Props) {
  if (!legalCase) return null;

  async function removeCase() {
    try {
      await CaseService.remove(legalCase.id);

      toast.success("Caso eliminado");

      onSuccess();

      onClose();
    } catch {
      toast.error("No fue posible eliminar el caso");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-3xl bg-white p-8">
        <h2 className="font-heading text-3xl text-foreground">Eliminar caso</h2>

        <p className="mt-5 text-muted">
          ¿Deseas eliminar el caso <strong>{legalCase.title}</strong>?
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-border px-5 py-3"
          >
            Cancelar
          </button>

          <button
            onClick={removeCase}
            className="rounded-xl bg-red-600 px-5 py-3 text-white"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
