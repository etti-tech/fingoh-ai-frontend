import Link from "next/link";

interface AuthButtonsProps {
  variant: "hero" | "cta";
}

export default function AuthButtons({ variant }: AuthButtonsProps) {
  if (variant === "hero") {
    return (
      <>
        <div className="relative mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/login"
            className="inline-flex min-w-[180px] items-center justify-center rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-indigo-700 shadow-lg transition hover:bg-indigo-50 hover:shadow-xl dark:bg-zinc-100 dark:text-indigo-800 dark:hover:bg-white"
          >
            Login
          </Link>
        </div>
        <p className="relative mt-4 text-xs text-indigo-200 dark:text-indigo-300">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="underline underline-offset-2 hover:text-white"
          >
            Create one for free
          </Link>
        </p>
      </>
    );
  }

  // CTA variant
  return (
    <>
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/login"
          className="inline-flex min-w-[180px] items-center justify-center rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-indigo-700 shadow-lg transition hover:bg-indigo-50 dark:bg-zinc-100 dark:text-indigo-800 dark:hover:bg-white"
        >
          Login
        </Link>
      </div>
      <p className="mt-4 text-center text-xs text-indigo-200 dark:text-indigo-300">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="underline underline-offset-2 hover:text-white"
        >
          Create one for free
        </Link>
      </p>
    </>
  );
}
