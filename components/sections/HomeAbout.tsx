import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

type AboutImage = { src: string; alt: string };

export function HomeAbout({
  title,
  body,
  images,
}: {
  title: string;
  body: ReadonlyArray<string>;
  images: ReadonlyArray<AboutImage>;
}) {
  // Use up to 2 images: a tall main image + a smaller offset companion.
  const [primary, secondary] = images;

  return (
    <Section spacing="lg">
      <Container width="wide" as="div">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-6 lg:col-span-6 lg:pt-8">
            <Eyebrow>About us</Eyebrow>
            <Heading level={2}>{title}</Heading>
            <div className="space-y-4 text-lg leading-relaxed text-[color:var(--color-ink-muted)]">
              {body.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            <div className="pt-2">
              <Button href="/about" variant="secondary">
                Read our story
              </Button>
            </div>
          </div>

          {primary && (
            <div className="relative lg:col-span-6">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg shadow-xl">
                <Image
                  src={primary.src}
                  alt={primary.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              {secondary && (
                <div className="absolute -bottom-10 -left-6 hidden aspect-square w-1/2 overflow-hidden rounded-lg shadow-2xl ring-8 ring-[color:var(--color-bg)] sm:block">
                  <Image
                    src={secondary.src}
                    alt={secondary.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
