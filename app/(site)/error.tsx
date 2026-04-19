"use client";

import { useEffect } from "react";

import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Errors here are usually a Sanity outage or a bad GROQ query.
    // Logging to the server console makes them findable in Vercel logs.
    console.error("[site/error]", error);
  }, [error]);

  return (
    <Container as="div" width="narrow" className="flex flex-1 flex-col justify-center gap-6 py-32 text-center">
      <Eyebrow className="mx-auto">Something went wrong</Eyebrow>
      <Heading level={1}>We hit a snag loading this page.</Heading>
      <p className="text-lg text-[color:var(--color-ink-muted)]">
        Try again — and if the issue sticks around, please{" "}
        <a className="underline" href="/contact">
          drop us a note
        </a>
        .
      </p>
      <div className="flex justify-center gap-3">
        <Button onClick={() => reset()}>Try again</Button>
        <Button href="/" variant="secondary">
          Back to home
        </Button>
      </div>
    </Container>
  );
}
