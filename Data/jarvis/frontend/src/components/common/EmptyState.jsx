import { motion } from 'framer-motion';
import { FiBox } from 'react-icons/fi';

export default function EmptyState({ icon: Icon = FiBox, title = 'Nothing here yet', description = 'Check back soon.', action }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-3xl glass flex items-center justify-center mb-6">
        <Icon className="text-primary-400 text-3xl" />
      </div>
      <h3 className="text-xl font-display font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-500 max-w-xs text-sm">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}
