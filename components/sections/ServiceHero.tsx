import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ValueIcon } from "@/components/sections/HomeValues";

export function ServiceHero({
  title,
  shortDescription,
  icon,
  image,
}: {
  title: string;
  shortDescription: string;
  icon: string;
  image: { src: string; alt: string };
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[color:var(--color-ink)] text-white">
      {image.src && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-55"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/80"
      />
      <Container as="div" width="wide" className="relative grid min-h-[60vh] place-items-end py-20">
        <div className="max-w-3xl space-y-5">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm font-medium text-white/80 transition hover:text-white"
          >
            <ChevronLeft aria-hidden className="h-4 w-4" />
            All services
          </Link>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[color:var(--color-accent)]">
              <ValueIcon name={icon} className="h-5 w-5" />
            </span>
            <Eyebrow className="text-white/80">Service</Eyebrow>
          </div>
          <Heading as="h1" level={1} className="text-white drop-shadow-sm">
            {title}
          </Heading>
          {shortDescription && (
            <p className="max-w-2xl text-lg text-white/85 sm:text-xl">{shortDescription}</p>
          )}
          <div className="pt-2">
            <Button href="/contact" size="lg" variant="inverse">
              Get a free quote
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
