import { Container } from "@/components/ui/Container";
import { getSiteSettings } from "@/lib/site";

import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

const CTA_HREF = "/contact";
const CTA_LABEL = "Get a free quote";

export async function Header() {
  const settings = await getSiteSettings();

  // Filter the homepage out of the visible nav — the logo is the home link.
  const visibleLinks = settings.navLinks.filter((l) => l.href !== "/");

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-rule)] bg-[color:var(--color-bg)]/85 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-bg)]/70">
      <Container width="wide" as="div" className="flex h-16 items-center justify-between gap-6 lg:h-20">
        <Logo businessName={settings.businessName} />

        <DesktopNav links={visibleLinks} />

        <div className="flex items-center gap-2">
          <a
            href={CTA_HREF}
            className="hidden h-10 items-center justify-center rounded-full bg-[color:var(--color-brand)] px-5 text-sm font-medium text-white transition hover:bg-[color:var(--color-brand-soft)] lg:inline-flex"
          >
            {CTA_LABEL}
          </a>
          <MobileNav links={visibleLinks} ctaHref={CTA_HREF} ctaLabel={CTA_LABEL} />
        </div>
      </Container>
    </header>
  );
}
