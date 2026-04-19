/**
 * Fallbacks used when Sanity hasn't been populated yet (e.g. fresh
 * deploy with empty dataset). The app should always render *something*
 * sensible — content gaps shouldn't crash pages.
 *
 * Once a Site Settings document exists in Sanity, those values win.
 */

export const SITE_DEFAULTS = {
  businessName: "Solemn Oath Contracting",
  tagline: "Your home, our passion.",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ],
  phone: "",
  email: "hello@solemnoathco.com",
  areaServed: "Ottawa region",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61555518099269",
    instagram: "https://www.instagram.com/solemnoathco/",
  },
  footerText: "Experienced, reliable contractors specializing in home renovations.",
} as const;

export type SiteSettings = {
  businessName?: string | null;
  tagline?: string | null;
  logo?: { asset?: unknown; alt?: string } | null;
  navLinks?: Array<{ label?: string; href?: string }> | null;
  phone?: string | null;
  email?: string | null;
  areaServed?: string | null;
  social?: { facebook?: string | null; instagram?: string | null } | null;
  footerText?: string | null;
};

/**
 * Merge a (possibly null/partial) Sanity Site Settings doc with defaults
 * so consumers always get a fully-populated object.
 */
export function withSiteDefaults(settings: SiteSettings | null | undefined) {
  return {
    businessName: settings?.businessName || SITE_DEFAULTS.businessName,
    tagline: settings?.tagline || SITE_DEFAULTS.tagline,
    logo: settings?.logo ?? null,
    navLinks:
      settings?.navLinks?.filter(
        (l): l is { label: string; href: string } =>
          typeof l?.label === "string" && typeof l?.href === "string",
      ).length
        ? (settings.navLinks!.filter(
            (l): l is { label: string; href: string } =>
              typeof l?.label === "string" && typeof l?.href === "string",
          ) as ReadonlyArray<{ label: string; href: string }>)
        : SITE_DEFAULTS.navLinks,
    phone: settings?.phone || SITE_DEFAULTS.phone,
    email: settings?.email || SITE_DEFAULTS.email,
    areaServed: settings?.areaServed || SITE_DEFAULTS.areaServed,
    social: {
      facebook: settings?.social?.facebook || SITE_DEFAULTS.social.facebook,
      instagram: settings?.social?.instagram || SITE_DEFAULTS.social.instagram,
    },
    footerText: settings?.footerText || SITE_DEFAULTS.footerText,
  };
}
