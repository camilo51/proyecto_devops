"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function CaseSearch({ value, onChange }: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Buscar caso..."
      className="w-full rounded-2xl border border-border bg-white px-5 py-4 outline-none transition focus:border-accent"
    />
  );
}
