import { HomeAbout } from "@/components/sections/HomeAbout";
import { HomeCta } from "@/components/sections/HomeCta";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeProjects } from "@/components/sections/HomeProjects";
import { HomeServices } from "@/components/sections/HomeServices";
import { HomeTestimonials } from "@/components/sections/HomeTestimonials";
import { HomeValues } from "@/components/sections/HomeValues";
import { getHomePageData } from "@/lib/home";

export const revalidate = 60;

export default async function HomePage() {
  const data = await getHomePageData();

  return (
    <>
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
