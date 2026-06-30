"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AuthService } from "@/services/auth.service";
import { RegisterSchema, registerSchema } from "@/validations/register.schema";
import { PasswordInput } from "./password-input";

export function RegisterForm() {
  const router = useRouter();
  const params = useParams();

  const token = params.token as string;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterSchema) {
    try {
      await AuthService.completeRegistration({
        token,
        password: data.password,
      });

      toast.success("Cuenta activada correctamente");

      router.push("/");
    } catch {
      toast.error("No fue posible completar el registro");
    }
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="font-heading text-5xl text-foreground">
        Completa tu registro
      </h2>

      <p className="mt-3 text-muted">
        Crea una contraseña para acceder a tu cuenta.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
        <PasswordInput
          placeholder="Contraseña"
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordInput
          placeholder="Confirmar contraseña"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-accent py-3 font-semibold text-white transition hover:bg-accent-hover disabled:opacity-60"
        >
          {isSubmitting ? "Creando cuenta..." : "Crear contraseña"}
        </button>
      </form>
    </div>
  );
}
