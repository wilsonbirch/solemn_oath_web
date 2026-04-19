"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/cn";
import {
  PROJECT_TYPE_OPTIONS,
  SOURCE_OPTIONS,
} from "@/lib/contact-defaults";
import {
  contactSchema,
  type ContactInput,
  type ContactResult,
} from "@/lib/contact-schema";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const initial: ContactInput = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  projectType: undefined,
  source: undefined,
  message: "",
  website: "",
};

const labelCls = "block text-sm font-medium text-[color:var(--color-ink)]";
const inputCls =
  "mt-2 block h-11 w-full rounded-md border border-[color:var(--color-rule)] bg-white px-3 text-sm text-[color:var(--color-ink)] transition focus:border-[color:var(--color-brand)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand)]/20";
const textareaCls =
  "mt-2 block w-full rounded-md border border-[color:var(--color-rule)] bg-white px-3 py-3 text-sm text-[color:var(--color-ink)] transition focus:border-[color:var(--color-brand)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand)]/20";
const errorCls = "mt-1 text-xs text-red-600";
const fieldErrorBorder = "border-red-400 focus:border-red-500 focus:ring-red-200";

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(initial);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactInput, string>>
  >({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function update<K extends keyof ContactInput>(key: K, value: ContactInput[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((e) => {
        const next = { ...e };
        delete next[key];
        return next;
      });
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "submitting" });
    setFieldErrors({});

    // Mirror the server-side validation so users see issues without a roundtrip.
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const errs: Partial<Record<keyof ContactInput, string>> = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path[0] as keyof ContactInput | undefined;
        if (path && !errs[path]) errs[path] = issue.message;
      }
      setFieldErrors(errs);
      setStatus({ kind: "error", message: "Please review the highlighted fields." });
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result: ContactResult = await res.json();
      if (result.ok) {
        setStatus({ kind: "success" });
        setValues(initial);
        return;
      }
      if (result.fieldErrors) setFieldErrors(result.fieldErrors);
      setStatus({ kind: "error", message: result.error });
    } catch {
      setStatus({
        kind: "error",
        message: "We couldn't reach the server. Try again or email us directly.",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-start gap-4 rounded-lg border border-[color:var(--color-rule)] bg-[color:var(--color-surface)] p-8"
      >
        <CheckCircle2 aria-hidden className="h-8 w-8 text-[color:var(--color-brand)]" />
        <div>
          <h3 className="font-display text-2xl">Got it — thanks!</h3>
          <p className="mt-2 text-base text-[color:var(--color-ink-muted)]">
            We&apos;ll get back to you within one business day. If it&apos;s
            urgent, give us a ring.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="text-sm font-medium text-[color:var(--color-brand)] underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelCls}>
            First name <span aria-hidden className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            required
            value={values.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            aria-invalid={Boolean(fieldErrors.firstName)}
            className={cn(inputCls, fieldErrors.firstName && fieldErrorBorder)}
          />
          {fieldErrors.firstName && <p className={errorCls}>{fieldErrors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className={labelCls}>
            Last name <span aria-hidden className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            required
            value={values.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            aria-invalid={Boolean(fieldErrors.lastName)}
            className={cn(inputCls, fieldErrors.lastName && fieldErrorBorder)}
          />
          {fieldErrors.lastName && <p className={errorCls}>{fieldErrors.lastName}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelCls}>
            Email <span aria-hidden className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            className={cn(inputCls, fieldErrors.email && fieldErrorBorder)}
          />
          {fieldErrors.email && <p className={errorCls}>{fieldErrors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone <span className="text-[color:var(--color-ink-muted)]">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone ?? ""}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={Boolean(fieldErrors.phone)}
            className={cn(inputCls, fieldErrors.phone && fieldErrorBorder)}
          />
          {fieldErrors.phone && <p className={errorCls}>{fieldErrors.phone}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="projectType" className={labelCls}>
            Project type
          </label>
          <select
            id="projectType"
            value={values.projectType ?? ""}
            onChange={(e) =>
              update(
                "projectType",
                (e.target.value || undefined) as ContactInput["projectType"],
              )
            }
            className={inputCls}
          >
            <option value="">Choose one</option>
            {PROJECT_TYPE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="source" className={labelCls}>
            How did you hear about us?
          </label>
          <select
            id="source"
            value={values.source ?? ""}
            onChange={(e) =>
              update("source", (e.target.value || undefined) as ContactInput["source"])
            }
            className={inputCls}
          >
            <option value="">Choose one</option>
            {SOURCE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          Tell us about your project <span aria-hidden className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          required
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(fieldErrors.message)}
          className={cn(textareaCls, fieldErrors.message && fieldErrorBorder)}
        />
        {fieldErrors.message && <p className={errorCls}>{fieldErrors.message}</p>}
      </div>

      {/* Honeypot — visually hidden, off-screen for assistive tech too */}
      <div aria-hidden className="sr-only" tabIndex={-1}>
        <label htmlFor="website">Leave this field blank</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website ?? ""}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      {status.kind === "error" && (
        <p role="alert" className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {status.message}
        </p>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[color:var(--color-brand)] px-7 text-sm font-medium text-white transition hover:bg-[color:var(--color-brand-soft)] disabled:opacity-60"
        >
          {submitting && <Loader2 aria-hidden className="h-4 w-4 animate-spin" />}
          {submitting ? "Sending…" : "Send message"}
        </button>
        <p className="text-xs text-[color:var(--color-ink-muted)]">
          We respond within one business day.
        </p>
      </div>
    </form>
  );
}
