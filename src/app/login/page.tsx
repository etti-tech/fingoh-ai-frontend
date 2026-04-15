import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portal Login",
  description: "Choose a demo role and navigate to product-specific dashboards.",
};

const roles = [
  { title: "Exhibitor", href: "/exhibitor-dashboard", description: "Manage booth selection, leads, and company profile." },
  { title: "Visitor", href: "/visitor-experience", description: "Browse exhibitors and request meetings." },
  { title: "Organizer", href: "/admin-dashboard", description: "Create events, allocate booths, and track KPIs." },
];

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Demo Login</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">Select a role to preview the relevant dashboard experience.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {roles.map((role) => (
          <Link key={role.title} href={role.href} className="rounded-2xl border border-zinc-200 bg-white p-4 transition hover:border-sky-500 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-sky-400">
            <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{role.title}</p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{role.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
