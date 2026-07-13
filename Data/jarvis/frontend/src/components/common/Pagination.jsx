import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Pagination({ current, total, onChange }) {
  if (total <= 1) return null;
  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
      <button onClick={() => onChange(current - 1)} disabled={current === 1}
        className="p-2.5 rounded-xl glass-sm text-slate-400 hover:text-white transition-all
                   disabled:opacity-30 disabled:cursor-not-allowed" aria-label="Previous">
        <FiChevronLeft className="text-lg" />
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map(p => (
        <button key={p} onClick={() => onChange(p)} aria-current={p === current ? 'page' : undefined}
          className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all
            ${p === current
              ? 'text-white shadow-[0_0_12px_rgba(99,102,241,0.5)]'
              : 'glass-sm text-slate-400 hover:text-white'}`}
          style={p === current ? { background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' } : {}}>
          {p}
        </button>
      ))}
      <button onClick={() => onChange(current + 1)} disabled={current === total}
        className="p-2.5 rounded-xl glass-sm text-slate-400 hover:text-white transition-all
                   disabled:opacity-30 disabled:cursor-not-allowed" aria-label="Next">
        <FiChevronRight className="text-lg" />
      </button>
    </nav>
  );
}
