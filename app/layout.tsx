import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";

import { Analytics } from "@/components/seo/Analytics";
import { isIndexingEnabled } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "Solemn Oath Contracting — Ottawa home renovations",
    template: "%s | Solemn Oath Contracting",
  },
  description:
    "Experienced, reliable contractors specializing in home renovations in the Ottawa region.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  // Indexing is gated on SEO_INDEX=true so the demo never gets crawled
  // before the owner approves go-live. Flip the env var (then redeploy)
  // to allow search engines in.
  robots: isIndexingEnabled()
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
