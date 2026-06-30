"use client";

import {
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Scale,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Clientes",
    href: "/clients",
    icon: Users,
  },
  {
    title: "Casos",
    href: "/cases",
    icon: FolderOpen,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-border bg-primary text-white">
      <div className="border-b border-white/10 p-8">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-accent p-4">
            <Scale size={28} />
          </div>

          <div>
            <h1 className="font-heading text-3xl">Legal Desk</h1>

            <p className="mt-1 text-sm text-white/60">Gestión Jurídica</p>
          </div>
        </div>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-2 px-5">
        {links.map(({ title, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition ${
              pathname === href
                ? "bg-accent text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon size={22} />

            <span>{title}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t border-white/10 p-5">
        <button className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-white/70 transition hover:bg-red-500 hover:text-white">
          <LogOut size={22} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
