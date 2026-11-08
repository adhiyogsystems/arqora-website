/** Arqora mark: an arch (arq, architecture: building things that last) with a saffron keystone. */
export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="arqora-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b4bd8" />
          <stop offset="1" stopColor="#151b4d" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#arqora-mark)" />
      <rect x=".5" y=".5" width="31" height="31" rx="8.5" fill="none" stroke="#fff" strokeOpacity=".14" />
      <path d="M8.5 24V16.5a7.5 7.5 0 0 1 15 0V24" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M12.6 24v-7a3.4 3.4 0 0 1 6.8 0v7" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="16" cy="6.6" r="2" fill="#f0a04b" />
    </svg>
  );
}
