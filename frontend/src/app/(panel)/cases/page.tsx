"use client";

import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { CaseEmpty } from "@/components/cases/case-empty";
import { CaseModal } from "@/components/cases/case-modal";
import { CaseSearch } from "@/components/cases/case-search";
import { CaseTable } from "@/components/cases/case-table";
import { DeleteCaseModal } from "@/components/cases/delete-case-modal";
import { CaseService } from "@/services/case.service";
import { Case } from "@/types/case";

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [editingCase, setEditingCase] = useState<Case | null>(null);

  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  useEffect(() => {
    loadCases();
  }, []);

  async function loadCases() {
    const response = await CaseService.findAll();

    setCases(response);
  }

  const filteredCases = useMemo(() => {
    return cases.filter((legalCase) =>
      `${legalCase.title} ${legalCase.description}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [cases, search]);

  return (
    <main>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-5xl text-foreground">Casos</h1>

          <p className="mt-2 text-muted">
            Administra todos los casos registrados.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCase(null);
            setOpenModal(true);
          }}
          className="flex items-center gap-3 rounded-2xl bg-accent px-6 py-4 text-white transition hover:bg-accent-hover"
        >
          <Plus size={20} />
          Nuevo caso
        </button>
      </div>

      <div className="mb-8">
        <CaseSearch value={search} onChange={setSearch} />
      </div>

      {filteredCases.length === 0 ? (
        <CaseEmpty />
      ) : (
        <CaseTable
          cases={filteredCases}
          onEdit={(legalCase) => {
            setEditingCase(legalCase);
            setOpenModal(true);
          }}
          onDelete={(legalCase) => {
            setSelectedCase(legalCase);
          }}
        />
      )}

      <CaseModal
        open={openModal}
        legalCase={editingCase}
        onClose={() => {
          setEditingCase(null);
          setOpenModal(false);
        }}
        onSuccess={loadCases}
      />

      <DeleteCaseModal
        legalCase={selectedCase}
        onClose={() => setSelectedCase(null)}
        onSuccess={loadCases}
      />
    </main>
  );
}
