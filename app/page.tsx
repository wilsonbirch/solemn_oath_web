import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-8 px-6 py-24">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--color-brand-warm)]">
        Solemn Oath Contracting
      </p>
      <h1 className="font-display text-5xl leading-[1.05] text-[color:var(--color-ink)] sm:text-6xl">
        Demo redesign — scaffold ready.
      </h1>
      <p className="max-w-xl text-lg text-[color:var(--color-ink-muted)]">
        Next.js + Tailwind + Sanity are wired up. The marketing pages
        (home, about, services, projects, testimonials, contact) land in
        subsequent PRs. Visit the embedded studio to manage content.
      </p>
      <div className="flex flex-wrap gap-4 text-sm font-medium">
        <Link
          href="/studio"
          className="rounded-full bg-[color:var(--color-brand)] px-6 py-3 text-white transition hover:bg-[color:var(--color-brand-soft)]"
        >
          Open Sanity Studio
        </Link>
      </div>
    </main>
  );
}
