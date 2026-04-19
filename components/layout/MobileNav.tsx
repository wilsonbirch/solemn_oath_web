"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/cn";

type NavLink = { label: string; href: string };

export function MobileNav({
  links,
  ctaHref,
  ctaLabel,
}: {
  links: ReadonlyArray<NavLink>;
  ctaHref: string;
  ctaLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const close = useCallback(() => setOpen(false), []);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // ESC closes drawer
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--color-ink)] transition hover:bg-[color:var(--color-rule)]/40 lg:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu aria-hidden className="h-5 w-5" />
      </button>

      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        {/* Backdrop */}
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-[color:var(--color-ink)]/40 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        {/* Panel */}
        <div
          className={cn(
            "absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-[color:var(--color-bg)] shadow-2xl transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-[color:var(--color-rule)] px-6 py-4">
            <span className="font-display text-lg">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--color-ink)] transition hover:bg-[color:var(--color-rule)]/40"
            >
              <X aria-hidden className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-4 py-6 text-lg">
            {links.map((link) => {
              const active =
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className={cn(
                    "rounded-md px-4 py-3 font-display transition",
                    active
                      ? "bg-[color:var(--color-rule)]/60 text-[color:var(--color-brand)]"
                      : "text-[color:var(--color-ink)] hover:bg-[color:var(--color-rule)]/40",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto border-t border-[color:var(--color-rule)] px-6 py-6">
            <Link
              href={ctaHref}
              onClick={close}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[color:var(--color-brand)] px-6 text-sm font-medium text-white transition hover:bg-[color:var(--color-brand-soft)]"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
