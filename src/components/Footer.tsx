import Link from "next/link";

import { Logo } from "@/components/Logo";
import { liveServices } from "@/data/services";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-mist">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo size={26} />
            <span className="font-semibold">{site.name}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">{site.tagline}</p>
          <p className="mt-3 text-sm text-ink-soft">{site.location}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Services</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            {liveServices().map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-brand">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Company</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li><Link href="/work" className="hover:text-brand">Our work</Link></li>
            <li><Link href="/about" className="hover:text-brand">About</Link></li>
            <li><Link href="/contact" className="hover:text-brand">Contact</Link></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-brand">{site.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-ink-soft">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
