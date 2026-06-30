"use client";

import { Pencil, Trash2 } from "lucide-react";

import { Case } from "@/types/case";

type Props = {
  cases: Case[];
  onEdit: (legalCase: Case) => void;
  onDelete: (legalCase: Case) => void;
};

export function CaseTable({ cases, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-white">
      <table className="w-full">
        <thead className="bg-surface">
          <tr>
            <th className="px-8 py-5 text-left font-medium">Título</th>

            <th className="px-8 py-5 text-left font-medium">Estado</th>

            <th className="px-8 py-5 text-left font-medium">Cliente</th>

            <th className="px-8 py-5 text-right font-medium">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {cases.map((legalCase) => (
            <tr key={legalCase.id} className="border-t border-border">
              <td className="px-8 py-6">
                <div>
                  <h3 className="font-medium text-foreground">
                    {legalCase.title}
                  </h3>

                  <span className="font-mono text-xs text-muted">
                    {legalCase.id}
                  </span>
                </div>
              </td>

              <td className="px-8 py-6">
                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    legalCase.status === "OPEN"
                      ? "bg-blue-100 text-blue-700"
                      : legalCase.status === "IN_PROGRESS"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                  }`}
                >
                  {legalCase.status}
                </span>
              </td>

              <td className="px-8 py-6">{legalCase.clientId}</td>

              <td className="px-8 py-6">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => onEdit(legalCase)}
                    className="rounded-xl bg-gold p-3 text-white"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(legalCase)}
                    className="rounded-xl bg-red-600 p-3 text-white"
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
