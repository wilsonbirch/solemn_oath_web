/**
 * GROQ queries — one named export per page or use case.
 * Pages should import these directly and pass results to section components.
 */

const imageProjection = `{
  ...,
  asset->{ _id, metadata { lqip, dimensions } }
}`;

export const siteSettingsQuery = /* groq */ `
  *[_type == "siteSettings"][0]{
    businessName,
    tagline,
    logo${imageProjection},
    navLinks,
    phone,
    email,
    areaServed,
    social,
    footerText,
    defaultSeo{ ..., ogImage${imageProjection} }
  }
`;

export const homePageQuery = /* groq */ `
  *[_type == "homePage"][0]{
    heroEyebrow,
    heroTitle,
    heroSubtitle,
    heroImage${imageProjection},
    heroPrimaryCta,
    heroSecondaryCta,
    aboutTitle,
    aboutBody,
    aboutImages[]${imageProjection},
    valuesTitle,
    values,
    featuredServicesTitle,
    featuredServices[]->{
      _id, title, "slug": slug.current, shortDescription, icon,
      heroImage${imageProjection}
    },
    featuredProjectsTitle,
    "featuredProjects": *[_type == "project" && featured == true] | order(completedDate desc)[0...6]{
      _id, title, "slug": slug.current, category, description,
      cover${imageProjection}
    },
    "featuredTestimonials": *[_type == "testimonial" && featured == true] | order(date desc)[0...3]{
      _id, name, projectType, rating, quote, date
    },
    ctaTitle, ctaSubtitle, ctaButton,
    seo{ ..., ogImage${imageProjection} }
  }
`;

export const aboutPageQuery = /* groq */ `
  *[_type == "aboutPage"][0]{
    heroTitle,
    heroImage${imageProjection},
    storyTitle,
    story,
    storyImages[]${imageProjection},
    teamTitle,
    team[]{ name, role, bio, photo${imageProjection} },
    nameMeaningTitle,
    nameMeaningBody,
    seo{ ..., ogImage${imageProjection} }
  }
`;

export const servicesIndexQuery = /* groq */ `{
  "page": *[_type == "servicesIndex"][0]{
    heroTitle, heroSubtitle, heroImage${imageProjection}, intro,
    seo{ ..., ogImage${imageProjection} }
  },
  "services": *[_type == "service"] | order(order asc, title asc){
    _id, title, "slug": slug.current, shortDescription, icon,
    heroImage${imageProjection}
  }
}`;

export const serviceBySlugQuery = /* groq */ `
  *[_type == "service" && slug.current == $slug][0]{
    title, "slug": slug.current, shortDescription, icon,
    heroImage${imageProjection},
    body[]{
      ...,
      _type == "imageWithAlt" => ${imageProjection}
    },
    process,
    gallery[]${imageProjection},
    relatedTestimonials[]->{
      _id, name, projectType, rating, quote, date
    },
    seo{ ..., ogImage${imageProjection} }
  }
`;

export const allServiceSlugsQuery = /* groq */ `*[_type == "service" && defined(slug.current)][].slug.current`;

export const projectsPageQuery = /* groq */ `{
  "page": *[_type == "projectsPage"][0]{
    heroTitle, heroSubtitle, heroImage${imageProjection},
    seo{ ..., ogImage${imageProjection} }
  },
  "projects": *[_type == "project"] | order(completedDate desc, _createdAt desc){
    _id, title, "slug": slug.current, category, description, completedDate,
    cover${imageProjection},
    gallery[]${imageProjection}
  }
}`;

export const testimonialsPageQuery = /* groq */ `{
  "page": *[_type == "testimonialsPage"][0]{
    heroTitle, heroSubtitle, heroImage${imageProjection},
    seo{ ..., ogImage${imageProjection} }
  },
  "testimonials": *[_type == "testimonial"] | order(date desc){
    _id, name, projectType, rating, quote, date
  }
}`;

export const contactPageQuery = /* groq */ `
  *[_type == "contactPage"][0]{
    heroTitle, heroSubtitle, heroImage${imageProjection},
    formIntro, hours, faq,
    seo{ ..., ogImage${imageProjection} }
  }
`;
