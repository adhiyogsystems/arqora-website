/** Catholicon mark: an open "C" ring (universal, all-round) around a saffron core. */
export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="catholicon-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b4bd8" />
          <stop offset="1" stopColor="#151b4d" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#catholicon-mark)" />
      <rect x=".5" y=".5" width="31" height="31" rx="8.5" fill="none" stroke="#fff" strokeOpacity=".14" />
      <path d="M22.4 10.6A8 8 0 1 0 22.4 21.4" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M19.6 13.2a4 4 0 1 0 0 5.6" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="16" cy="16" r="1.9" fill="#f0a04b" />
    </svg>
  );
}
