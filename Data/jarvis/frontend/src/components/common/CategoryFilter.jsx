import { motion } from 'framer-motion';

export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Category filter">
      {categories.map(cat => (
        <motion.button key={cat.value} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={() => onChange(cat.value)}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200
            ${active === cat.value
              ? 'text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]'
              : 'glass-sm text-slate-400 hover:text-white'}`}
          style={active === cat.value ? { background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' } : {}}
          aria-pressed={active === cat.value}
        >
          {cat.label}
        </motion.button>
      ))}
    </div>
  );
}
