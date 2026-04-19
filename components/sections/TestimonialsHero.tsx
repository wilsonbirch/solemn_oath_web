import Image from "next/image";
import { Star } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading } from "@/components/ui/Heading";

export function TestimonialsHero({
  title,
  subtitle,
  image,
  averageRating,
  count,
}: {
  title: string;
  subtitle?: string;
  image: { src: string; alt: string };
  averageRating: number;
  count: number;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[color:var(--color-ink)] text-white">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-50"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70"
      />
      <Container as="div" width="wide" className="relative grid min-h-[55vh] place-items-end py-20">
        <div className="max-w-3xl space-y-5">
          <Eyebrow className="text-white/80">Testimonials</Eyebrow>
          <Heading as="h1" level={1} className="text-white drop-shadow-sm">
            {title}
          </Heading>
          {subtitle && (
            <p className="max-w-2xl text-lg text-white/85 sm:text-xl">{subtitle}</p>
          )}
          {count > 0 && (
            <div
              className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur"
              role="img"
              aria-label={`Average rating ${averageRating.toFixed(1)} out of 5 across ${count} reviews`}
            >
              <span className="flex items-center gap-0.5 text-[color:var(--color-accent)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    aria-hidden
                    className={i < Math.round(averageRating) ? "h-4 w-4 fill-current" : "h-4 w-4"}
                  />
                ))}
              </span>
              <span className="font-medium">
                {averageRating.toFixed(1)} / 5 · {count} review{count === 1 ? "" : "s"}
              </span>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
