/** Simple mark: two joined arcs (two parts in union: "yog"), with a saffron point. */
export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#1b2563" />
      <path d="M8 21c0-5 3.6-9 8-9s8 4 8 9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M12 21c0-2.6 1.8-4.6 4-4.6s4 2 4 4.6" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="16" cy="8" r="2.2" fill="#e8892b" />
    </svg>
  );
}
