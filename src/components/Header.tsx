"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/Logo";
import type { Lang } from "@/i18n/config";
import { localePath, switchPath } from "@/i18n/config";
import { dict } from "@/i18n/dict";

/** Globe + language code. Goes to the same page in the other language. */
function LangSwitch({ lang, dark, pathname }: { lang: Lang; dark: boolean; pathname: string }) {
  const target = switchPath(pathname);
  return (
    <a
      href={target.href}
      hrefLang={target.lang}
      lang={target.lang}
      title={dict[lang].switchTo}
      aria-label={dict[lang].switchTo}
      className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-[13px] font-semibold uppercase tracking-wide transition-colors ${
        dark ? "border-white/15 hover:bg-white/10" : "border-ink/12 hover:bg-ink/5"
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
      </svg>
      <span>{lang}</span>
      <span aria-hidden="true" className="opacity-40">/</span>
      <span className="opacity-60">{target.lang}</span>
    </a>
  );
}

/**
 * Floating pill header. It reads the data-theme of whatever section is under
 * it and switches between a dark glass and a light glass look.
 */
export function Header({ lang }: { lang: Lang }) {
  const t = dict[lang].nav;
  const nav = [
    { href: localePath(lang, "/services"), label: t.services },
    { href: localePath(lang, "/work"), label: t.work },
    { href: localePath(lang, "/about"), label: t.about },
  ];
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
      const points = document.elementsFromPoint(window.innerWidth / 2, 44);
      for (const el of points) {
        if (ref.current?.contains(el)) continue;
        const section = el.closest("[data-theme]");
        if (section) {
          setDark(section.getAttribute("data-theme") === "dark");
          return;
        }
      }
      setDark(false);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const shell = dark
    ? "border-white/10 bg-night/55 text-white"
    : "border-ink/8 bg-white/75 text-ink shadow-[0_8px_30px_-12px_rgba(14,18,34,0.18)]";

  return (
    <header ref={ref} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={`mx-auto max-w-6xl rounded-2xl border backdrop-blur-xl transition-colors duration-500 ${shell} ${
          scrolled ? "" : "sm:border-transparent sm:bg-transparent sm:shadow-none sm:backdrop-blur-none"
        }`}
      >
        <div className="flex h-14 items-center justify-between gap-2 pl-3 pr-2 sm:h-16 sm:pl-4">
          <Link href={localePath(lang, "/")} className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <Logo size={32} />
            <span className="leading-none">
              <span className="block font-display text-[17px] font-semibold tracking-tight">arqora</span>
              <span className={`block text-[9.5px] font-medium uppercase tracking-[0.22em] ${dark ? "text-mute" : "text-ink-soft"}`}>
                technology solutions
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                    dark ? "hover:bg-white/10" : "hover:bg-ink/5"
                  } ${active ? "" : dark ? "text-white/80" : "text-ink/75"}`}
                >
                  {item.label}
                  {active && <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-iris to-saffron" />}
                </Link>
              );
            })}
            <span className="ml-2">
              <LangSwitch lang={lang} dark={dark} pathname={pathname} />
            </span>
            <Link
              href={localePath(lang, "/contact")}
              className={`ml-2 rounded-xl px-5 py-2.5 text-[15px] font-semibold transition-colors ${
                dark ? "bg-white text-night hover:bg-saffron" : "bg-night text-white hover:bg-brand"
              }`}
            >
              {t.talk}
            </Link>
          </nav>

          <div className="flex items-center gap-1 md:hidden">
            <LangSwitch lang={lang} dark={dark} pathname={pathname} />
            <button
              type="button"
              className="rounded-xl p-2.5"
              aria-label={open ? t.menuClose : t.menuOpen}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav className="fade-in px-3 pb-4 md:hidden">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block border-t py-3.5 font-display text-2xl font-medium ${dark ? "border-white/10" : "border-ink/10"}`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={localePath(lang, "/contact")}
              onClick={() => setOpen(false)}
              className={`mt-3 block rounded-xl py-3.5 text-center font-semibold ${dark ? "bg-white text-night" : "bg-night text-white"}`}
            >
              {t.talk}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
