import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { FacebookIcon, InstagramIcon } from "@/components/layout/SocialIcons";

export function ContactInfo({
  email,
  phone,
  areaServed,
  hours,
  social,
}: {
  email: string;
  phone?: string;
  areaServed: string;
  hours?: string;
  social: { facebook?: string; instagram?: string };
}) {
  return (
    <aside className="space-y-8 rounded-lg border border-[color:var(--color-rule)] bg-[color:var(--color-surface)] p-8">
      <div>
        <h2 className="font-display text-2xl">Get in touch directly</h2>
        <p className="mt-2 text-sm text-[color:var(--color-ink-muted)]">
          Prefer the phone? Email? Either way works.
        </p>
      </div>

      <ul className="space-y-5 text-sm">
        <li className="flex items-start gap-3">
          <Mail aria-hidden className="mt-0.5 h-4 w-4 text-[color:var(--color-brand)]" />
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
              Email
            </p>
            <a
              href={`mailto:${email}`}
              className="text-base text-[color:var(--color-ink)] underline-offset-4 hover:underline"
            >
              {email}
            </a>
          </div>
        </li>
        {phone && (
          <li className="flex items-start gap-3">
            <Phone aria-hidden className="mt-0.5 h-4 w-4 text-[color:var(--color-brand)]" />
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
                Phone
              </p>
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="text-base text-[color:var(--color-ink)] underline-offset-4 hover:underline"
              >
                {phone}
              </a>
            </div>
          </li>
        )}
        <li className="flex items-start gap-3">
          <MapPin aria-hidden className="mt-0.5 h-4 w-4 text-[color:var(--color-brand)]" />
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
              Area served
            </p>
            <p className="text-base text-[color:var(--color-ink)]">{areaServed}</p>
          </div>
        </li>
        {hours && (
          <li className="flex items-start gap-3">
            <Clock aria-hidden className="mt-0.5 h-4 w-4 text-[color:var(--color-brand)]" />
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
                Hours
              </p>
              <p className="text-base text-[color:var(--color-ink)]">{hours}</p>
            </div>
          </li>
        )}
      </ul>

      {(social.facebook || social.instagram) && (
        <div className="border-t border-[color:var(--color-rule)] pt-6">
          <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
            Follow along
          </p>
          <div className="mt-3 flex items-center gap-3">
            {social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-rule)] text-[color:var(--color-ink-muted)] transition hover:border-[color:var(--color-brand)] hover:text-[color:var(--color-brand)]"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
            )}
            {social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-rule)] text-[color:var(--color-ink-muted)] transition hover:border-[color:var(--color-brand)] hover:text-[color:var(--color-brand)]"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
