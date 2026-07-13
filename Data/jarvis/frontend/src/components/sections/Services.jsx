import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../../store/slices/servicesSlice';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCode, FiLayout, FiSettings, FiCloud, FiDatabase } from 'react-icons/fi';
import SectionHeader from '../common/SectionHeader';
import SearchBar from '../common/SearchBar';
import EmptyState from '../common/EmptyState';
import SkeletonCard from '../common/SkeletonCard';
import useDebounce from '../../hooks/useDebounce';

const ICON_MAP = {
  code:FiCode, layout:FiLayout, briefcase:FiBriefcase,
  settings:FiSettings, cloud:FiCloud, database:FiDatabase,
};
const getIcon = (n) => ICON_MAP[n?.toLowerCase()] || FiBriefcase;

const GRAD_COLORS = [
  'from-primary-600 to-accent-600',
  'from-cyan-500 to-primary-600',
  'from-emerald-500 to-cyan-600',
  'from-accent-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-primary-600 to-emerald-500',
];

export default function Services() {
  const dispatch = useDispatch();
  const { items: services, loading } = useSelector(s => s.services);
  const [q, setQ] = useState('');
  const debQ = useDebounce(q, 250);

  useEffect(() => { dispatch(fetchServices()); }, [dispatch]);

  const filtered = services.filter(s =>
    s.serviceName.toLowerCase().includes(debQ.toLowerCase())
  );

  return (
    <section id="services" className="section-wrap bg-dark-900">
      <div className="container">
        <SectionHeader eyebrow="Services" title="What I Offer" subtitle="Professional services to bring your vision to life" />

        <div className="max-w-md mx-auto mb-12">
          <SearchBar value={q} onChange={setQ} placeholder="Search services…" />
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={FiBriefcase} title="No services found"
            description={q ? `No services match "${q}"` : 'Services coming soon'} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((svc, i) => {
              const Icon  = getIcon(svc.icon);
              const grad  = GRAD_COLORS[i % GRAD_COLORS.length];
              return (
                <motion.div key={svc._id}
                  initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="glass p-7 group">
                  <div className={`w-13 h-13 w-[52px] h-[52px] rounded-2xl bg-gradient-to-br ${grad}
                                  flex items-center justify-center mb-5 shadow-[0_4px_16px_rgba(99,102,241,0.3)]
                                  group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white text-2xl" />
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-3 group-hover:text-primary-300 transition-colors">
                    {svc.serviceName}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{svc.serviceDesc}</p>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '48px' }} viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.3, duration: 0.8 }}
                    className="h-1 rounded-full mt-5" style={{ background: 'linear-gradient(90deg,#6366f1,#d946ef)' }} />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
