import { HomeCta } from "@/components/sections/HomeCta";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ServicesIndexHero } from "@/components/sections/ServicesIndexHero";
import { getServicesIndex } from "@/lib/services";

export const revalidate = 60;

export const metadata = {
  title: "Services",
  description:
    "Bathroom and kitchen remodelling, basement renovations, decks, flooring, drywall, panelling, trim and doors, demolition — Ottawa-area home renovation services.",
};

export default async function ServicesPage() {
  const data = await getServicesIndex();

  return (
    <>
      <ServicesIndexHero {...data.hero} />
      <ServicesGrid intro={data.intro} services={data.services} />
      <HomeCta
        title="Have a project in mind?"
        subtitle="A free consultation is the easiest place to start. We'll come to you."
        button={{ label: "Get a free quote", href: "/contact" }}
      />
    </>
  );
}
