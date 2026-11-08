import Image from "next/image";

import { ButtonLink, Eyebrow } from "@/components/ui";
import type { Project } from "@/data/projects";

/** A project shown inside a browser-window frame, with what we built beside it. */
export function ProjectShowcase({
  project,
  headingLevel = "h3",
  reverse = false,
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
  reverse?: boolean;
}) {
  const H = headingLevel;
  return (
    <article className={`grid items-center gap-10 lg:gap-16 ${reverse ? "lg:grid-cols-[1fr_1.25fr]" : "lg:grid-cols-[1.25fr_1fr]"}`}>
      <div data-reveal className={`${reverse ? "lg:order-2" : ""} overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_40px_80px_-30px_rgba(14,18,34,0.35)]`}>
        <div className="flex items-center gap-2 border-b border-ink/10 bg-mist px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          {project.url && (
            <span className="ml-3 truncate rounded-md bg-white px-3 py-1 text-xs text-ink-soft">
              {project.url.replace(/^https?:\/\//, "")}
            </span>
          )}
        </div>
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} website home page`}
            width={1350}
            height={615}
            sizes="(min-width: 1024px) 640px, 100vw"
            className="h-auto w-full transition-transform duration-700 hover:scale-[1.02]"
          />
        ) : (
          <div className="aspect-[1350/615] bg-cream" />
        )}
      </div>

      <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
        <Eyebrow>{project.category}</Eyebrow>
        <H className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{project.name.toLowerCase()}</H>
        <p className="mt-5 leading-relaxed text-ink-soft">{project.summary}</p>
        <ul className="mt-6 grid gap-2.5">
          {project.built.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" />
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <span key={t} className="rounded-full border border-ink/12 px-3 py-1 text-sm text-ink-soft">{t}</span>
          ))}
        </div>
        {project.url && (
          <div className="mt-8">
            <ButtonLink href={project.url}>visit live site</ButtonLink>
          </div>
        )}
      </div>
    </article>
  );
}
