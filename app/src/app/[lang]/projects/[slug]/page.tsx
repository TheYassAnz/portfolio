import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, locales } from "@/lib/i18n";
import {
  getProject,
  getProjectContent,
  getProjectSlugs,
  getScreenshots,
} from "@/lib/projects";

type Props = Readonly<{ params: Promise<{ lang: string; slug: string }> }>;

// Repos tagged on GitHub after a deploy render on first request (ISR).
export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const project = await getProject(slug, lang);
  if (!project) notFound();
  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/${lang}/projects/${slug}`,
      languages: {
        fr: `/fr/projects/${slug}`,
        en: `/en/projects/${slug}`,
        "x-default": `/fr/projects/${slug}`,
      },
    },
  };
}

const linkClass =
  "border border-line px-3 py-1 hover:bg-accent hover:text-on-accent";

export default async function ProjectPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const project = await getProject(slug, lang);
  if (!project) notFound();
  const [content, screenshots] = await Promise.all([
    getProjectContent(project.slug, lang),
    getScreenshots(project.slug),
  ]);
  const showGallery = content?.source === "portfolio" && screenshots.length > 0;
  const { work } = getDictionary(lang);

  const meta = [
    project.role,
    project.year,
    project.featured && `★ ${work.featured}`,
  ].filter(Boolean);

  return (
    <main className="py-16">
      <Link
        href={`/${lang}#projects`}
        className="text-fg-muted hover:text-fg mb-10 inline-block text-sm"
      >
        ← {work.back}
      </Link>

      <header className="border-line border-y py-8">
        <h1 className="font-display text-4xl md:text-6xl">{project.title}</h1>
        <p className="text-fg-muted mt-4 text-sm">{meta.join(" · ")}</p>
        {(project.github || project.demo) && (
          <div className="mt-6 flex gap-4 text-sm">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                [ {work.code} ]
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                [ {work.demo} ]
              </a>
            )}
          </div>
        )}
      </header>

      {content ? (
        // HTML comes from GitHub's renderer, which sanitizes it.
        <div
          className="readme border-line border-b py-8"
          dangerouslySetInnerHTML={{ __html: content.html }}
        />
      ) : (
        project.description && (
          <p className="max-w-2xl py-8">{project.description}</p>
        )
      )}

      {showGallery && (
        <section className="py-8">
          <h2 className="text-fg-muted mb-6 text-sm uppercase">
            {work.gallery}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {screenshots.map((src, i) => (
              <a key={src} href={src} target="_blank" rel="noopener noreferrer">
                <Image
                  src={src}
                  alt={`${project.title} — ${i + 1}`}
                  width={1600}
                  height={900}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="border-line h-auto w-full border"
                />
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
