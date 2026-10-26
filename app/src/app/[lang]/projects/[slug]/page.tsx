import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, locales } from "@/lib/i18n";
import { getProject, getProjectSlugs, toParagraphs } from "@/lib/strapi";

type Props = { params: Promise<{ lang: string; slug: string }> };

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
  const { work } = getDictionary(lang);

  const meta = [project.role, project.year, work.status[project.status]].filter(
    Boolean,
  );
  const intro = toParagraphs(project.longDescription);
  const blocks = [
    [work.problem, project.problem],
    [work.solution, project.solution],
    [work.results, project.results],
  ].filter(([, text]) => text);

  return (
    <main className="py-16">
      <Link
        href={`/${lang}#projects`}
        className="mb-10 inline-block text-sm text-fg-muted hover:text-fg"
      >
        ← {work.back}
      </Link>

      <header className="border-y border-line py-8">
        <h1 className="font-display text-4xl md:text-6xl">{project.title}</h1>
        <p className="mt-4 text-sm text-fg-muted">{meta.join(" · ")}</p>
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

      {project.image && (
        <Image
          src={project.image}
          alt={project.title}
          width={1600}
          height={900}
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="mt-8 h-auto w-full border border-line"
          priority
        />
      )}

      {intro.length > 0 && (
        <section className="max-w-2xl space-y-4 border-b border-line py-8">
          {intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>
      )}

      {blocks.map(([label, text]) => (
        <section
          key={label}
          className="grid gap-4 border-b border-line py-8 md:grid-cols-[12rem_1fr]"
        >
          <h2 className="text-sm text-fg-muted uppercase">{label}</h2>
          <div className="max-w-2xl space-y-4">
            {toParagraphs(text).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      ))}

      <section className="grid gap-4 border-b border-line py-8 md:grid-cols-[12rem_1fr]">
        <h2 className="text-sm text-fg-muted uppercase">{work.stack}</h2>
        <ul className="flex flex-wrap gap-2 text-sm">
          {project.stack.map((tech) => (
            <li key={tech} className="border border-line px-3 py-1">
              {tech}
            </li>
          ))}
        </ul>
      </section>

      {project.gallery.length > 0 && (
        <section className="py-8">
          <h2 className="mb-4 text-sm text-fg-muted uppercase">
            {work.gallery}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {project.gallery.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={`${project.title} — ${i + 1}`}
                width={1600}
                height={900}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="h-auto w-full border border-line"
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
