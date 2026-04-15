import type { Metadata } from "next";

import BoothGrid from "@/components/booth-grid";
import LeadsTable from "@/components/leads-table";

export const metadata: Metadata = {
  title: "Exhibitor Dashboard",
  description: "Demo dashboard for exhibitors with booth selection, leads, and company profile.",
};

const sidebarItems = ["Overview", "Booth Selection", "Leads", "Meetings", "Company Profile"];

export default function ExhibitorDashboardPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <aside className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Exhibitor Dashboard</h1>
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <p key={item} className="rounded-lg px-3 py-2 text-sm text-zinc-600 first:bg-zinc-900 first:text-white dark:text-zinc-300 dark:first:bg-zinc-100 dark:first:text-zinc-900">
              {item}
            </p>
          ))}
        </nav>
      </aside>

      <div className="space-y-6">
        <BoothGrid />
        <LeadsTable />
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Company Profile</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <ProfileField label="Company" value="Nexa Systems" />
            <ProfileField label="Industry" value="Industrial IoT" />
            <ProfileField label="Website" value="www.nexa-systems.demo" />
            <ProfileField label="Primary Contact" value="Avery Kim" />
          </div>
        </section>
      </div>
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-200">{value}</p>
    </div>
  );
}
