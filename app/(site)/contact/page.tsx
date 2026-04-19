import { ContactFaq } from "@/components/sections/ContactFaq";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactHero } from "@/components/sections/ContactHero";
import { ContactInfo } from "@/components/sections/ContactInfo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getContactPageData } from "@/lib/contact";
import { getSiteSettings } from "@/lib/site";

export const revalidate = 60;

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Solemn Oath Contracting for a free in-home consultation on your Ottawa-area renovation.",
};

export default async function ContactPage() {
  const [page, site] = await Promise.all([getContactPageData(), getSiteSettings()]);

  return (
    <>
      <ContactHero {...page.hero} />
      <Section spacing="lg">
        <Container width="wide" as="div">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              {page.formIntro.length > 0 && (
                <div className="space-y-3">
                  {page.formIntro.map((p, i) => (
                    <p
                      key={i}
                      className="text-lg leading-relaxed text-[color:var(--color-ink-muted)]"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              )}
              <ContactForm />
            </div>
            <div className="lg:col-span-5">
              <ContactInfo
                email={site.email}
                phone={site.phone}
                areaServed={site.areaServed}
                hours={page.hours}
                social={site.social}
              />
            </div>
          </div>
        </Container>
      </Section>
      <ContactFaq items={page.faq} />
    </>
  );
}
