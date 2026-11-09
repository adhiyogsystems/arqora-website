import Link from "next/link";

import { Logo } from "@/components/Logo";
import { liveServices } from "@/data/services";
import { offices, site, telHref, whatsappLink } from "@/lib/site";

export function Footer() {
  const wa = whatsappLink(`Hello ${site.shortName}, I would like to discuss a project.`);
  return (
    <footer data-theme="dark" className="relative overflow-hidden bg-night text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-10 pt-20 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo size={30} />
            <span className="font-display text-lg font-semibold">arqora</span>
          </div>
          <p className="mt-4 max-w-xs leading-relaxed text-mute">{site.tagline}</p>
          <div className="mt-8 grid gap-5 text-sm sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {offices.map((o) => (
              <div key={o.country}>
                <p className="font-semibold text-white">
                  {o.country} <span className="font-normal text-mute">· {o.label}</span>
                </p>
                {o.lines.length > 0 && (
                  <address className="mt-1.5 not-italic leading-relaxed text-mute">
                    {o.lines.slice(1).map((l) => (
                      <span key={l} className="block">{l}</span>
                    ))}
                  </address>
                )}
                {o.phone && o.phone !== site.phone && (
                  <a href={telHref(o.phone)} className="mt-1.5 block text-white/85 hover:text-saffron">{o.phone}</a>
                )}
                {o.email && (
                  <a href={`mailto:${o.email}`} className="mt-1.5 block text-white/85 hover:text-saffron">{o.email}</a>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-mute">services</h3>
          <ul className="mt-4 space-y-2.5">
            {liveServices().map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-white/85 transition-colors hover:text-saffron">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-mute">connect</h3>
          <ul className="mt-4 space-y-2.5">
            <li><a href={`mailto:${site.email}`} className="text-white/85 hover:text-saffron">{site.email}</a></li>
            <li><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-white/85 hover:text-saffron">{site.phone}</a></li>
            {wa && (
              <li><a href={wa} target="_blank" rel="noopener noreferrer" className="text-white/85 hover:text-saffron">WhatsApp</a></li>
            )}
            <li><Link href="/work" className="text-white/85 hover:text-saffron">Our work</Link></li>
            <li><Link href="/about" className="text-white/85 hover:text-saffron">About</Link></li>
          </ul>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none select-none px-3 text-center font-display text-[30vw] font-semibold leading-[0.8] tracking-[-0.06em] text-white/[0.04] md:text-[26vw]">
        arqora
      </div>

      <div className="border-t border-night-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-sm text-mute sm:flex-row sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>{site.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
