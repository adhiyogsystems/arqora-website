"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/Logo";

const nav = [
  { href: "/services", label: "services" },
  { href: "/work", label: "work" },
  { href: "/about", label: "about" },
];

/**
 * Floating pill header. It reads the data-theme of whatever section is under
 * it and switches between a dark glass and a light glass look.
 */
export function Header() {
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
        <div className="flex h-14 items-center justify-between pl-3 pr-2 sm:h-16 sm:pl-4">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <Logo size={32} />
            <span className="leading-none">
              <span className="block font-display text-[17px] font-semibold tracking-tight">catholicon</span>
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
            <Link
              href="/contact"
              className={`ml-3 rounded-xl px-5 py-2.5 text-[15px] font-semibold transition-colors ${
                dark ? "bg-white text-night hover:bg-saffron" : "bg-night text-white hover:bg-brand"
              }`}
            >
              let&apos;s talk
            </Link>
          </nav>

          <button
            type="button"
            className="rounded-xl p-2.5 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
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
              href="/contact"
              onClick={() => setOpen(false)}
              className={`mt-3 block rounded-xl py-3.5 text-center font-semibold ${dark ? "bg-white text-night" : "bg-night text-white"}`}
            >
              let&apos;s talk
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
