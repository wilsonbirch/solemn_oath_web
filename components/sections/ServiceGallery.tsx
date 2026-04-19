import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading } from "@/components/ui/Heading";

type GalleryImage = { src: string; alt: string };

export function ServiceGallery({
  title = "Recent work",
  images,
}: {
  title?: string;
  images: ReadonlyArray<GalleryImage>;
}) {
  if (images.length === 0) return null;

  return (
    <Section spacing="lg">
      <Container width="wide" as="div">
        <div className="max-w-2xl space-y-3">
          <Eyebrow>Gallery</Eyebrow>
          <Heading level={2}>{title}</Heading>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {images.slice(0, 9).map((img, idx) => (
            <figure
              key={`${img.src}-${idx}`}
              className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[color:var(--color-rule)]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 hover:scale-[1.04]"
              />
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
