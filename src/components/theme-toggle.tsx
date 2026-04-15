"use client";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains("dark");
    const shouldBeDark = !isCurrentlyDark;
    document.documentElement.classList.toggle("dark", shouldBeDark);

    try {
      window.localStorage.setItem("theme", shouldBeDark ? "dark" : "light");
    } catch {
      // no-op for restricted storage environments
    }
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
