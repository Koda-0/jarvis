import { motion } from 'framer-motion';

export default function SectionHeader({ eyebrow, title, subtitle, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}
      className={`mb-14 ${center ? 'text-center' : ''}`}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="text-slate-400 text-lg mt-3 max-w-xl mx-auto">{subtitle}</p>}
      <div className={`section-divider ${center ? 'mx-auto' : ''}`} />
    </motion.div>
  );
}
