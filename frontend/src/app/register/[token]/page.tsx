import { RegisterBanner } from "@/components/auth/register-banner";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-2">
      <RegisterBanner />

      <section className="flex items-center justify-center px-8 py-12">
        <RegisterForm />
      </section>
    </main>
  );
}
