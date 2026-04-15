import { leads } from "@/data/mock-data";

const scoreStyles: Record<string, string> = {
  Hot: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200",
  Warm: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200",
  Cold: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
};

export default function LeadsTable() {
  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Recent Leads</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-50 text-left text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-300">
            <tr>
              <th className="px-4 py-3">Lead ID</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Interest</th>
              <th className="px-4 py-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t border-zinc-100 dark:border-zinc-800">
                <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{lead.id}</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">{lead.contact}</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">{lead.company}</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">{lead.interest}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${scoreStyles[lead.score]}`}>{lead.score}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
