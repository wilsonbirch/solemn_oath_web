import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading } from "@/components/ui/Heading";

type StoryImage = { src: string; alt: string };

export function AboutStory({
  title,
  body,
  images,
}: {
  title: string;
  body: ReadonlyArray<string>;
  images: ReadonlyArray<StoryImage>;
}) {
  const [primary, secondary] = images;

  return (
    <Section spacing="lg">
      <Container width="wide" as="div">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Image collage left, text right — mirror of HomeAbout to keep visual rhythm fresh */}
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
                <div className="absolute -bottom-10 -right-6 hidden aspect-square w-1/2 overflow-hidden rounded-lg shadow-2xl ring-8 ring-[color:var(--color-bg)] sm:block">
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

          <div className="space-y-6 lg:col-span-6 lg:pt-8">
            <Eyebrow>Our story</Eyebrow>
            <Heading level={2}>{title}</Heading>
            <div className="space-y-4 text-lg leading-relaxed text-[color:var(--color-ink-muted)]">
              {body.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
