import { HomeAbout } from "@/components/sections/HomeAbout";
import { HomeCta } from "@/components/sections/HomeCta";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeProjects } from "@/components/sections/HomeProjects";
import { HomeServices } from "@/components/sections/HomeServices";
import { HomeTestimonials } from "@/components/sections/HomeTestimonials";
import { HomeValues } from "@/components/sections/HomeValues";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { getHomePageData } from "@/lib/home";
import { getSiteSettings } from "@/lib/site";

export const revalidate = 60;

export default async function HomePage() {
  const [data, site] = await Promise.all([getHomePageData(), getSiteSettings()]);

  return (
    <>
      <LocalBusinessJsonLd
        businessName={site.businessName}
        email={site.email}
        phone={site.phone}
        areaServed={site.areaServed}
        social={site.social}
      />
      <HomeHero {...data.hero} />
      <HomeAbout {...data.about} />
      <HomeValues {...data.values} />
      <HomeServices {...data.services} />
      <HomeProjects {...data.projects} />
      <HomeTestimonials {...data.testimonials} />
      <HomeCta {...data.cta} />
    </>
  );
}
