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
      className="rounded-lg border border-zinc-300 p-1.5 text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
      aria-label="Toggle dark mode"
    >
      {/* Sun icon – visible in dark mode */}
      <svg
        className="hidden h-4 w-4 dark:block"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        />
      </svg>
      {/* Moon icon – visible in light mode */}
      <svg
        className="block h-4 w-4 dark:hidden"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 8.002-4.248 9.72 9.72 0 0 1-1 0v-1.75Z"
        />
      </svg>
    </button>
  );
}
