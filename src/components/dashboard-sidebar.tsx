"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "./auth-context";
import type { UserRole } from "@/data/mock-data";

const roleLabels: Record<UserRole, string> = {
  organiser: "Organiser",
  exhibitor: "Exhibitor",
  visitor: "Visitor",
  sponsor: "Sponsor",
  vendor: "Vendor",
};

type SidebarLink = { href: string; label: string; icon: React.ComponentType<{ active: boolean }> };

const organiserLinks: SidebarLink[] = [
  { href: "/dashboard", label: "Events", icon: CalendarIcon },
  { href: "/dashboard/analytics", label: "Analytics", icon: ChartIcon },
  { href: "/dashboard/enquiries", label: "Enquiries", icon: InboxIcon },
  { href: "/dashboard/team", label: "Team", icon: TeamIcon },
  { href: "/dashboard/settings", label: "Settings", icon: SettingsIcon },
  { href: "/dashboard/profile", label: "Profile", icon: UserIcon },
];

const exhibitorLinks: SidebarLink[] = [
  { href: "/dashboard", label: "Events", icon: CalendarIcon },
  { href: "/dashboard/bookings", label: "My Bookings", icon: TicketIcon },
  { href: "/dashboard/products", label: "Products", icon: CubeIcon },
  { href: "/dashboard/leads", label: "Leads", icon: LeadIcon },
  { href: "/dashboard/sponsors", label: "Sponsors", icon: SponsorIcon },
  { href: "/dashboard/profile", label: "Profile", icon: UserIcon },
  { href: "/dashboard/settings", label: "Settings", icon: SettingsIcon },
];

const visitorLinks: SidebarLink[] = [
  { href: "/dashboard", label: "Events", icon: CalendarIcon },
  { href: "/dashboard/floor-map", label: "Floor Map", icon: MapIcon },
  { href: "/dashboard/my-badges", label: "My Badges", icon: BadgeIcon },
  { href: "/dashboard/smart-match", label: "Smart Match", icon: SparklesIcon },
  { href: "/dashboard/my-schedule", label: "My Schedule", icon: ClockIcon },
  { href: "/dashboard/favorites", label: "Favorites", icon: HeartIcon },
  { href: "/dashboard/networking", label: "Networking", icon: NetworkIcon },
  { href: "/dashboard/profile", label: "Profile", icon: UserIcon },
  { href: "/dashboard/settings", label: "Settings", icon: SettingsIcon },
];

const roleSidebarLinks: Record<UserRole, SidebarLink[]> = {
  organiser: organiserLinks,
  exhibitor: exhibitorLinks,
  visitor: visitorLinks,
  sponsor: organiserLinks,   // fallback for now
  vendor: organiserLinks,    // fallback for now
};

export default function DashboardSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roleDropdown, setRoleDropdown] = useState(false);
  const pathname = usePathname();
  const { user, logout, switchRole } = useAuth();

  if (!user) return null;

  const sidebar = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-extrabold text-white">E</span>
        <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">EttiExpo</span>
      </div>

      {/* User card */}
      <div className="mx-4 mb-4 rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/50">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
            {user.avatar}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">{user.name}</p>
            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Role switcher */}
      <div className="relative mx-4 mb-4">
        <button
          type="button"
          onClick={() => setRoleDropdown(!roleDropdown)}
          className="flex w-full items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          <span className="flex items-center gap-2">
            <RoleBadge role={user.role} />
            {roleLabels[user.role]}
          </span>
          <ChevronIcon open={roleDropdown} />
        </button>
        {roleDropdown && (
          <div className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
            {user.roles.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => {
                  switchRole(role);
                  setRoleDropdown(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition hover:bg-zinc-100 dark:hover:bg-zinc-700 ${
                  role === user.role ? "bg-indigo-50 font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300" : "text-zinc-700 dark:text-zinc-300"
                }`}
              >
                <RoleBadge role={role} />
                {roleLabels[role]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 space-y-1 px-3">
        {(roleSidebarLinks[user.role] ?? organiserLinks).map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              <link.icon active={active} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-zinc-200 p-3 dark:border-zinc-800">
        <Link
          href="/"
          onClick={() => {
            logout();
            setMobileOpen(false);
          }}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 transition hover:bg-red-50 hover:text-red-600 dark:text-zinc-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
        >
          <LogoutIcon />
          Logout
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-30 rounded-lg border border-zinc-200 bg-white p-2 shadow-sm lg:hidden dark:border-zinc-700 dark:bg-zinc-900"
        aria-label="Open menu"
      >
        <svg className="h-5 w-5 text-zinc-700 dark:text-zinc-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-zinc-200 bg-white transition-transform duration-200 lg:hidden dark:border-zinc-800 dark:bg-zinc-900 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="absolute right-3 top-4 rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          aria-label="Close menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
        {sidebar}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-zinc-200 bg-white lg:block dark:border-zinc-800 dark:bg-zinc-900">
        {sidebar}
      </aside>
    </>
  );
}

/* ─── Small helper components ─── */

const roleColors: Record<UserRole, string> = {
  organiser: "bg-indigo-500",
  exhibitor: "bg-emerald-500",
  visitor: "bg-sky-500",
  sponsor: "bg-amber-500",
  vendor: "bg-violet-500",
};

function RoleBadge({ role }: { role: UserRole }) {
  return <span className={`inline-block h-2 w-2 rounded-full ${roleColors[role]}`} />;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function CalendarIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-5 w-5 ${active ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  );
}

function UserIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-5 w-5 ${active ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
    </svg>
  );
}

function ChartIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-5 w-5 ${active ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  );
}

function InboxIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-5 w-5 ${active ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
    </svg>
  );
}

function TeamIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-5 w-5 ${active ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
  );
}

function SettingsIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-5 w-5 ${active ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

function TicketIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-5 w-5 ${active ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
    </svg>
  );
}

function CubeIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-5 w-5 ${active ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  );
}

function LeadIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-5 w-5 ${active ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  );
}

function SponsorIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-5 w-5 ${active ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  );
}

/* ─── Visitor-specific icons ─── */

function MapIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-5 w-5 ${active ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
    </svg>
  );
}

function BadgeIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-5 w-5 ${active ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
    </svg>
  );
}

function SparklesIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-5 w-5 ${active ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  );
}

function ClockIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-5 w-5 ${active ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function HeartIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-5 w-5 ${active ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  );
}

function NetworkIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-5 w-5 ${active ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
    </svg>
  );
}
