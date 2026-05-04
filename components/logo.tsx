export function Logo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-label="RM — Rayver Muñoz">
      <rect x="1" y="1" width="34" height="34" rx="8" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
      {/* R */}
      <path
        d="M9 10h5.5a3 3 0 0 1 0 6H9m0-6v12m0-6h4l3 6"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* M */}
      <path
        d="M20 22V10l4 7 4-7v12"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
