export default function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-white py-8 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 text-sm text-zinc-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8 dark:text-zinc-400">
        <p>© {new Date().getFullYear()} ExpoFlow. Built for B2B exhibition teams.</p>
        <p>Demo environment · No production data connected</p>
      </div>
    </footer>
  );
}
