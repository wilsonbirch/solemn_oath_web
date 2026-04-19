import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HomeCta } from "@/components/sections/HomeCta";
import { HomeTestimonials } from "@/components/sections/HomeTestimonials";
import { ServiceBody } from "@/components/sections/ServiceBody";
import { ServiceGallery } from "@/components/sections/ServiceGallery";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { ServiceProcess } from "@/components/sections/ServiceProcess";
import { getAllServiceSlugs, getServiceBySlug } from "@/lib/services";

export const revalidate = 60;
// Only allow slugs we've pre-generated. New Sanity services come into rotation
// when ISR re-runs generateStaticParams (within ~60s). The benefit: unknown
// slugs return a real 404 instead of a 200-cached not-found page.
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const data = await getServiceBySlug(slug);
  if (!data) return { title: "Service not found" };
  return {
    title: data.service.title,
    description: data.service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const data = await getServiceBySlug(slug);
  if (!data) notFound();

  const { service, gallery, testimonials } = data;

  return (
    <>
      <ServiceHero
        title={service.title}
        shortDescription={service.shortDescription}
        icon={service.icon}
        image={service.heroImage}
      />
      <ServiceBody paragraphs={service.body} />
      <ServiceProcess steps={service.process} />
      {gallery.length > 0 && <ServiceGallery images={gallery} />}
      {testimonials.length > 0 && (
        <HomeTestimonials title="What clients said" items={testimonials} />
      )}
      <HomeCta
        title={`Ready to talk ${service.title.toLowerCase()}?`}
        subtitle="A free in-home consultation is the easiest place to start."
        button={{ label: "Get a free quote", href: "/contact" }}
      />
    </>
  );
}
