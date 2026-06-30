import { LoginBanner } from "@/components/auth/login-banner";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-2">
      <LoginBanner />

      <section className="flex items-center justify-center px-8 py-12">
        <LoginForm />
      </section>
    </main>
  );
}
