"use client";

type ClientSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ClientSearch({ value, onChange }: ClientSearchProps) {
  return (
    <input
      type="text"
      placeholder="Buscar cliente..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-2xl border border-border bg-white px-5 py-4 outline-none transition focus:border-accent"
    />
  );
}
