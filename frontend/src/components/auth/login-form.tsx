"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AuthService } from "@/services/auth.service";
import { LoginSchema, loginSchema } from "@/validations/login.schema";
import { PasswordInput } from "./password-input";

export function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginSchema) {
    try {
      const response = await AuthService.login(data);

      localStorage.setItem("user", JSON.stringify(response.user));

      toast.success("Bienvenido");

      router.push("/dashboard");
    } catch {
      toast.error("Correo o contraseña incorrectos");
    }
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="font-heading text-5xl text-foreground">Iniciar sesión</h2>

      <p className="mt-3 text-muted">
        Ingresa tus credenciales para acceder al sistema.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-12 space-y-6">
        <div>
          <label className="mb-2 block font-medium text-foreground">
            Correo electrónico
          </label>

          <input
            type="email"
            placeholder="correo@empresa.com"
            {...register("email")}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 outline-none transition focus:border-accent"
          />

          {errors.email && (
            <span className="mt-2 block text-sm text-red-600">
              {errors.email.message}
            </span>
          )}
        </div>

        <PasswordInput
          placeholder="********"
          {...register("password")}
          error={errors.password?.message}
        />

        <button
          disabled={isSubmitting}
          className="w-full rounded-xl bg-accent py-3 font-semibold text-white transition hover:bg-accent-hover disabled:opacity-60"
        >
          {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}
