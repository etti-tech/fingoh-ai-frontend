"use client";

import { useState } from "react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  designation: string;
  access: "admin" | "editor" | "viewer";
  joined: string;
}

const mockTeam: TeamMember[] = [
  { id: "TM-01", name: "Nagaraj Jayaraman", email: "nagaraj@etti.tech", avatar: "NJ", designation: "Platform Admin", access: "admin", joined: "2024-01-15" },
  { id: "TM-02", name: "Ganesh Murugan", email: "ganesh@etti.tech", avatar: "GM", designation: "Event Manager", access: "editor", joined: "2024-03-20" },
  { id: "TM-03", name: "Deepika Rajan", email: "deepika@etti.tech", avatar: "DR", designation: "Sales Lead", access: "editor", joined: "2024-06-10" },
  { id: "TM-04", name: "Arjun Nair", email: "arjun@etti.tech", avatar: "AN", designation: "Operations", access: "viewer", joined: "2025-01-05" },
];

const accessStyle: Record<string, string> = {
  admin: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300",
  editor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  viewer: "bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300",
};

export default function TeamPage() {
  const [team] = useState(mockTeam);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Team</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Manage your organisation&apos;s team members
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Invite Member
        </button>
      </div>

      {/* Team grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <div
            key={member.id}
            className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                {member.avatar}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">{member.name}</p>
                <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{member.designation}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{member.email}</p>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${accessStyle[member.access]}`}>
                {member.access.charAt(0).toUpperCase() + member.access.slice(1)}
              </span>
            </div>
            <p className="mt-2 text-xs text-zinc-400">
              Joined {new Date(member.joined).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
