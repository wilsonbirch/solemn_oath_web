import { AboutHero } from "@/components/sections/AboutHero";
import { AboutNameMeaning } from "@/components/sections/AboutNameMeaning";
import { AboutStory } from "@/components/sections/AboutStory";
import { AboutTeam } from "@/components/sections/AboutTeam";
import { HomeCta } from "@/components/sections/HomeCta";
import { getAboutPageData } from "@/lib/about";

export const revalidate = 60;

export const metadata = {
  title: "About",
  description:
    "Solemn Oath Contracting is an Ottawa home renovation company founded by Andrew Mott and Alex Gauthier. Meet the team and read our story.",
};

export default async function AboutPage() {
  const data = await getAboutPageData();

  return (
    <>
      <AboutHero {...data.hero} />
      <AboutStory {...data.story} />
      <AboutTeam {...data.team} />
      <AboutNameMeaning {...data.name} />
      <HomeCta {...data.cta} />
    </>
  );
}
