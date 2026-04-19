import { HomeCta } from "@/components/sections/HomeCta";
import { ProjectsGallery } from "@/components/sections/ProjectsGallery";
import { ProjectsHero } from "@/components/sections/ProjectsHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getProjectsPage } from "@/lib/projects";

export const revalidate = 60;

export const metadata = {
  title: "Projects",
  description:
    "Recent home renovations across the Ottawa region — kitchens, bathrooms, basements, decks, and whole-home transformations.",
};

export default async function ProjectsPage() {
  const data = await getProjectsPage();

  return (
    <>
      <ProjectsHero {...data.hero} />
      <Section spacing="lg">
        <Container width="wide" as="div">
          <ProjectsGallery projects={data.projects} />
        </Container>
      </Section>
      <HomeCta
        title="Like what you see?"
        subtitle="We'd love to hear about your project. The first chat is on us."
        button={{ label: "Get a free quote", href: "/contact" }}
      />
    </>
  );
}
