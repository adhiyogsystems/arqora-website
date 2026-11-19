import Image from "next/image";

/** A laptop-style browser window around a screenshot. */
export function BrowserFrame({
  src,
  alt,
  url,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 640px, 92vw",
}: {
  src: string;
  alt: string;
  url?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-[1.4rem] border border-white/10 bg-white shadow-[0_50px_100px_-40px_rgba(0,0,0,0.6)] ${className}`}>
      <div className="flex items-center gap-1.5 bg-[#eef0f6] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        {url && <span className="ml-3 truncate rounded-full bg-white px-3 py-0.5 text-[11px] text-ink-soft">{url}</span>}
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
    </div>
  );
}

/** A phone with rounded bezel around a mobile screenshot. */
export function PhoneFrame({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 300px, 60vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`rounded-[2.6rem] bg-[#0b0d16] p-2.5 shadow-[0_50px_90px_-30px_rgba(0,0,0,0.55)] ring-1 ring-white/10 ${className}`}>
      <div className="relative aspect-[500/1040] overflow-hidden rounded-[2.1rem] bg-white">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
        <span aria-hidden="true" className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-[#0b0d16]" />
      </div>
    </div>
  );
}
