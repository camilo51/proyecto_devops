import { ReactNode } from "react";

import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-screen overflow-hidden">
      <Sidebar />

      <section className="flex flex-1 flex-col overflow-hidden">
        <Navbar />

        <div className="flex-1 overflow-y-auto bg-background p-10">
          {children}
        </div>
      </section>
    </main>
  );
}
