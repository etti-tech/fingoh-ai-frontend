"use client";

import { useEffect } from "react";

export default function ThemeToggle() {
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const currentlyDark = document.documentElement.classList.contains("dark");
    const next = !currentlyDark;
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
      aria-label="Toggle dark mode"
    >
      Toggle theme
    </button>
  );
}
