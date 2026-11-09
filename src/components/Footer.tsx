import Link from "next/link";

import { Logo } from "@/components/Logo";
import { liveServices } from "@/data/services";
import type { Lang } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { dict } from "@/i18n/dict";
import { legal, offices, primaryEmail, site, siteText, telHref, whatsappLink } from "@/lib/site";

export function Footer({ lang }: { lang: Lang }) {
  const t = dict[lang].footer;
  const wa = whatsappLink(dict[lang].cta.waMessage);
  const emails = Array.from(new Set([primaryEmail(lang), site.email]));
  return (
    <footer data-theme="dark" className="relative overflow-hidden bg-night text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-10 pt-20 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo size={30} />
            <span className="font-display text-lg font-semibold">arqora</span>
          </div>
          <p className="mt-4 max-w-xs leading-relaxed text-mute">{siteText[lang].tagline}</p>
          <div className="mt-8 grid gap-5 text-sm sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {offices.map((o) => (
              <div key={o.key}>
                <p className="font-semibold text-white">
                  {o.country[lang]} <span className="font-normal text-mute">· {o.label[lang]}</span>
                </p>
                {o.lines[lang].length > 0 && (
                  <address className="mt-1.5 not-italic leading-relaxed text-mute">
                    {o.lines[lang].slice(1).map((l) => (
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
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-mute">{t.services}</h3>
          <ul className="mt-4 space-y-2.5">
            {liveServices(lang).map((s) => (
              <li key={s.slug}>
                <Link href={localePath(lang, `/services/${s.slug}`)} className="text-white/85 transition-colors hover:text-saffron">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-mute">{t.connect}</h3>
          <ul className="mt-4 space-y-2.5">
            {emails.map((e) => (
              <li key={e}><a href={`mailto:${e}`} className="text-white/85 hover:text-saffron">{e}</a></li>
            ))}
            <li><a href={telHref(site.phone)} className="text-white/85 hover:text-saffron">{site.phone}</a></li>
            {wa && (
              <li><a href={wa} target="_blank" rel="noopener noreferrer" className="text-white/85 hover:text-saffron">WhatsApp</a></li>
            )}
            <li><Link href={localePath(lang, "/work")} className="text-white/85 hover:text-saffron">{t.work}</Link></li>
            <li><Link href={localePath(lang, "/about")} className="text-white/85 hover:text-saffron">{t.about}</Link></li>
          </ul>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none select-none px-3 text-center font-display text-[30vw] font-semibold leading-[0.8] tracking-[-0.06em] text-white/[0.04] md:text-[26vw]">
        arqora
      </div>

      <div className="border-t border-night-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-sm text-mute sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>
            © {new Date().getFullYear()} {legal.operator}, {legal.operatorCountry[lang]}. {t.rights}
            <span className="mt-1 block text-xs text-mute/70">
              {lang === "de"
                ? `${site.name} ist eine Marke von ${legal.operator}, ${legal.operatorCountry.de}.`
                : `${site.name} is a brand of ${legal.operator}, ${legal.operatorCountry.en}.`}
            </span>
          </span>
          <span className="flex gap-5">
            <Link href={localePath(lang, "/impressum")} className="hover:text-white">{t.impressum}</Link>
            <Link href={localePath(lang, "/privacy")} className="hover:text-white">{t.privacy}</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
