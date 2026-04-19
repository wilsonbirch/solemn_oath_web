import { HomeCta } from "@/components/sections/HomeCta";
import { TestimonialsGrid } from "@/components/sections/TestimonialsGrid";
import { TestimonialsHero } from "@/components/sections/TestimonialsHero";
import { getTestimonialsPage } from "@/lib/testimonials";

export const revalidate = 60;

export const metadata = {
  title: "Testimonials",
  description:
    "Reviews from Ottawa-area homeowners on bathroom, kitchen, basement, deck, and whole-home renovations by Solemn Oath Contracting.",
};

export default async function TestimonialsPage() {
  const data = await getTestimonialsPage();

  return (
    <>
      <TestimonialsHero
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        image={data.hero.image}
        averageRating={data.stats.averageRating}
        count={data.stats.count}
      />
      <TestimonialsGrid testimonials={data.testimonials} />
      <HomeCta
        title="Become the next happy homeowner."
        subtitle="Tell us about your project — first consult is on us."
        button={{ label: "Get a free quote", href: "/contact" }}
      />
    </>
  );
}
