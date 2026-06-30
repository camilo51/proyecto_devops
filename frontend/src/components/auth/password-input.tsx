"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type PasswordInputProps = {
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function PasswordInput({ error, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="mb-2 block font-medium text-foreground">
        Contraseña
      </label>

      <div className="relative">
        <input
          {...props}
          type={showPassword ? "text" : "password"}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 pr-12 outline-none transition focus:border-accent"
        />

        <button
          type="button"
          onClick={() => setShowPassword((value) => !value)}
          className="absolute top-1/2 right-4 -translate-y-1/2 text-muted"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {error && (
        <span className="mt-2 block text-sm text-red-600">{error}</span>
      )}
    </div>
  );
}
