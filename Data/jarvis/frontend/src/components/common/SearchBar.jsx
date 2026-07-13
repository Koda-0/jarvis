import { FiSearch, FiX } from 'react-icons/fi';

export default function SearchBar({ value, onChange, placeholder = 'Search…' }) {
  return (
    <div className="relative">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg pointer-events-none" />
      <input
        value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} className="field pl-11 pr-10" aria-label={placeholder}
      />
      {value && (
        <button onClick={() => onChange('')} aria-label="Clear"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
          <FiX className="text-lg" />
        </button>
      )}
    </div>
  );
}
