import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../store/slices/projectsSlice';
import { FiGithub, FiExternalLink, FiX, FiUsers, FiUser } from 'react-icons/fi';
import SectionHeader from '../common/SectionHeader';
import SearchBar from '../common/SearchBar';
import CategoryFilter from '../common/CategoryFilter';
import Pagination from '../common/Pagination';
import EmptyState from '../common/EmptyState';
import SkeletonCard from '../common/SkeletonCard';
import { PROJECT_TYPES, PER_PAGE } from '../../utils/constants';
import { imgUrl } from '../../utils/helpers';
import useDebounce from '../../hooks/useDebounce';

const GRADS = ['from-primary-800 to-accent-700','from-cyan-800 to-primary-700','from-emerald-800 to-cyan-700',
               'from-accent-700 to-pink-700','from-amber-800 to-orange-700','from-primary-700 to-emerald-700'];

export default function Projects({ limit }) {
  const dispatch = useDispatch();
  const { items: projects, loading } = useSelector(s => s.projects);
  const [q, setQ]     = useState('');
  const [type, setType] = useState('all');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);
  const debQ = useDebounce(q, 250);

  useEffect(() => { dispatch(fetchProjects()); }, [dispatch]);

  const filtered = projects.filter(p => {
    const mQ = p.title.toLowerCase().includes(debQ.toLowerCase());
    const mT = type === 'all' || p.type === type;
    return mQ && mT;
  });

  const paginated = limit
    ? filtered.slice(0, limit)
    : filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = limit ? 1 : Math.ceil(filtered.length / PER_PAGE);

  return (
    <section id="projects" className="section-wrap bg-dark-950">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none -z-10" />
      <div className="container relative z-10">
        <SectionHeader eyebrow="Projects" title="My Work" subtitle="A showcase of projects I've built" />

        {!limit && (
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="flex-1"><SearchBar value={q} onChange={setQ} placeholder="Search projects…" /></div>
            <CategoryFilter categories={PROJECT_TYPES} active={type} onChange={v => { setType(v); setPage(1); }} />
          </div>
        )}

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {[...Array(limit || 6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : paginated.length === 0 ? (
          <EmptyState icon={FiGithub} title="No projects found"
            description={q ? `No projects match "${q}"` : 'Projects coming soon'} />
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {paginated.map((p, i) => {
                const grad = GRADS[i % GRADS.length];
                return (
                  <motion.div key={p._id}
                    initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.55 }}
                    whileHover={{ y: -6 }} onClick={() => setModal(p)}
                    className="glass overflow-hidden cursor-pointer group card-hover">
                    <div className={`relative h-48 bg-gradient-to-br ${grad} overflow-hidden flex items-center justify-center`}>
                      {p.Image && <img src={imgUrl(p.Image)} alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-2 right-2">
                        {p.type === 'collaborated'
                          ? <span className="glass-sm px-2 py-0.5 text-xs font-semibold text-accent-300 flex items-center gap-1"><FiUsers className="text-xs" /> Collab</span>
                          : <span className="glass-sm px-2 py-0.5 text-xs font-semibold text-primary-300 flex items-center gap-1"><FiUser className="text-xs" /> Solo</span>}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display font-bold text-white text-base mb-2 group-hover:text-primary-300 transition-colors">{p.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4">{p.description}</p>
                      <div className="flex items-center gap-3 text-xs font-semibold">
                        <a href={p.link} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                          className="flex items-center gap-1 text-primary-400 hover:text-primary-300 transition-colors">
                          <FiGithub /> Code
                        </a>
                        <span className="text-slate-700">•</span>
                        <button onClick={e => { e.stopPropagation(); setModal(p); }}
                          className="flex items-center gap-1 text-accent-400 hover:text-accent-300 transition-colors">
                          <FiExternalLink /> Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            {!limit && <Pagination current={page} total={totalPages} onChange={setPage} />}
          </>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()}
              className="glass max-w-2xl w-full max-h-[90vh] overflow-auto">
              {modal.Image && (
                <div className="h-64 overflow-hidden bg-gradient-to-br from-primary-900 to-accent-900">
                  <img src={imgUrl(modal.Image)} alt={modal.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="font-display font-bold text-white text-2xl">{modal.title}</h2>
                  <button onClick={() => setModal(null)}
                    className="p-2 rounded-xl hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all">
                    <FiX className="text-xl" />
                  </button>
                </div>
                <p className="text-slate-400 leading-relaxed mb-6">{modal.description}</p>
                <div className="flex flex-wrap gap-3">
                  <a href={modal.link} target="_blank" rel="noreferrer" className="btn-primary">
                    <FiGithub /> View Code
                  </a>
                  <span className={`badge ${modal.type === 'collaborated' ? 'badge-pink' : 'badge-blue'}`}>
                    {modal.type === 'collaborated' ? 'Collaborated' : 'Solo Project'}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
