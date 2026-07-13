export default function Spinner({ size = 'md', className = '' }) {
  const s = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }[size];
  return (
    <svg className={`animate-spin ${s} ${className}`} viewBox="0 0 24 24" fill="none" role="status" aria-label="Loading">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-20" />
      <path d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" fill="currentColor" className="opacity-80" />
    </svg>
  );
}

export function FullPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" className="text-primary-500" />
        <p className="text-slate-500 animate-pulse text-sm">Loading…</p>
      </div>
    </div>
  );
}
