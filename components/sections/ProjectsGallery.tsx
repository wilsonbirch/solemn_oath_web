"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { cn } from "@/lib/cn";
import {
  PROJECT_CATEGORIES,
  type Project,
  type ProjectCategory,
} from "@/lib/projects-defaults";

/**
 * Flatten all projects' images into a single ordered list for the
 * lightbox, while keeping a parallel index map so clicking a tile
 * opens the right slide.
 */
function flattenForLightbox(projects: ReadonlyArray<Project>) {
  const slides: { src: string; alt: string; description?: string }[] = [];
  const tileToSlideIndex: Record<string, number> = {};

  for (const project of projects) {
    tileToSlideIndex[project._id] = slides.length;
    // Use the gallery if present; otherwise the cover counts as one slide
    const images = project.gallery && project.gallery.length > 0 ? project.gallery : [project.cover];
    for (const img of images) {
      slides.push({
        src: img.src,
        alt: img.alt,
        description: project.title,
      });
    }
  }

  return { slides, tileToSlideIndex };
}

export function ProjectsGallery({ projects }: { projects: ReadonlyArray<Project> }) {
  const [filter, setFilter] = useState<ProjectCategory>("all");
  const [openAt, setOpenAt] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects],
  );

  const { slides, tileToSlideIndex } = useMemo(
    () => flattenForLightbox(filtered),
    [filtered],
  );

  // Categories to render in the chip rail — only show those that have at least one project.
  const visibleCategories = useMemo(() => {
    const present = new Set(projects.map((p) => p.category as string));
    return PROJECT_CATEGORIES.filter(
      (c) => c.value === "all" || present.has(c.value),
    );
  }, [projects]);

  return (
    <>
      {/* Filter chips */}
      <div
        className="-mx-2 mb-10 flex flex-wrap items-center gap-2 px-2"
        role="tablist"
        aria-label="Filter projects by category"
      >
        {visibleCategories.map((c) => {
          const active = c.value === filter;
          return (
            <button
              key={c.value}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => setFilter(c.value as ProjectCategory)}
              className={cn(
                "h-9 rounded-full px-4 text-sm font-medium transition",
                active
                  ? "bg-[color:var(--color-brand)] text-white"
                  : "border border-[color:var(--color-rule)] text-[color:var(--color-ink-muted)] hover:border-[color:var(--color-brand)] hover:text-[color:var(--color-ink)]",
              )}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-[color:var(--color-ink-muted)]">
          No projects in this category yet.
        </p>
      ) : (
        <ul
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3"
          aria-label={`${filtered.length} projects`}
        >
          {filtered.map((project, idx) => (
            <li key={project._id} className={cn(idx % 5 === 0 && "lg:col-span-2 lg:row-span-2")}>
              <button
                type="button"
                onClick={() => setOpenAt(tileToSlideIndex[project._id] ?? 0)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-[color:var(--color-rule)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-accent)]"
                aria-label={`Open ${project.title} gallery`}
              >
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition group-hover:opacity-100"
                />
                <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 text-left text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/80">
                    {PROJECT_CATEGORIES.find((c) => c.value === project.category)?.label ?? project.category}
                  </p>
                  <h3 className="mt-1 font-display text-lg sm:text-xl">{project.title}</h3>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Lightbox
        open={openAt !== null}
        index={openAt ?? 0}
        close={() => setOpenAt(null)}
        slides={slides}
        controller={{ closeOnBackdropClick: true }}
        styles={{
          container: { backgroundColor: "rgba(20, 22, 22, 0.94)" },
        }}
      />
    </>
  );
}
