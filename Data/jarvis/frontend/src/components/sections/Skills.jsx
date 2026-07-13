import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkills } from '../../store/slices/skillsSlice';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiSearch } from 'react-icons/fi';
import {
  SiReact, SiNodedotjs, SiMongodb, SiPython, SiGit, SiDocker,
  SiFigma, SiTailwindcss, SiJavascript, SiMysql,
} from 'react-icons/si';
import SectionHeader from '../common/SectionHeader';
import SearchBar from '../common/SearchBar';
import CategoryFilter from '../common/CategoryFilter';
import EmptyState from '../common/EmptyState';
import SkeletonCard from '../common/SkeletonCard';
import { SKILL_CATS } from '../../utils/constants';
import useDebounce from '../../hooks/useDebounce';

const ICON_MAP = {
  react: SiReact, node: SiNodedotjs, nodejs: SiNodedotjs,
  mongodb: SiMongodb, python: SiPython, git: SiGit,
  docker: SiDocker, figma: SiFigma, tailwind: SiTailwindcss,
  javascript: SiJavascript, mysql: SiMysql,
};
const getIcon = (name) => {
  const k = name.toLowerCase().replace(/[\s.]/g, '').replace('js','');
  return ICON_MAP[k] || FiCode;
};

function SkillBar({ skill, i }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
  const Icon = getIcon(skill.skillName);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }}
      whileHover={{ y: -4 }} className="glass-sm p-5 group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
            <Icon className="text-white text-base" />
          </div>
          <span className="font-semibold text-white text-sm">{skill.skillName}</span>
        </div>
        <span className="text-xs font-bold text-primary-400">{skill.level}%</span>
      </div>
      <div className="bar-bg">
        <motion.div className="bar-fill"
          initial={{ width: 0 }} animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: i * 0.05, ease: 'easeOut' }} />
      </div>
      <p className="text-slate-600 text-xs capitalize mt-2">{skill.category}</p>
    </motion.div>
  );
}

export default function Skills() {
  const dispatch = useDispatch();
  const { items: skills, loading } = useSelector(s => s.skills);
  const [q, setQ]       = useState('');
  const [cat, setCat]   = useState('all');
  const debQ            = useDebounce(q, 250);

  useEffect(() => { dispatch(fetchSkills()); }, [dispatch]);

  const filtered = skills.filter(s => {
    const matchQ   = s.skillName.toLowerCase().includes(debQ.toLowerCase());
    const matchCat = cat === 'all' || s.category === cat;
    return matchQ && matchCat;
  });

  const grouped = filtered.reduce((acc, s) => {
    (acc[s.category] = acc[s.category] || []).push(s);
    return acc;
  }, {});

  return (
    <section id="skills" className="section-wrap bg-dark-950">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none -z-10" />
      <div className="container relative z-10">
        <SectionHeader eyebrow="Skills" title="My Technical Arsenal" subtitle="Technologies and tools I work with" />

        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1"><SearchBar value={q} onChange={setQ} placeholder="Search skills…" /></div>
          <CategoryFilter categories={SKILL_CATS} active={cat} onChange={setCat} />
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={FiCode} title="No skills found"
            description={q ? `No skills match "${q}"` : 'No skills added yet'} />
        ) : (
          <div className="space-y-12">
            {Object.entries(grouped).map(([catKey, catSkills]) => (
              <div key={catKey}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-7 rounded-full" style={{ background: 'linear-gradient(180deg,#6366f1,#d946ef)' }} />
                  <h3 className="font-display font-semibold text-white text-xl capitalize">{catKey}</h3>
                  <span className="badge badge-blue">{catSkills.length}</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {catSkills.map((sk, i) => <SkillBar key={sk._id} skill={sk} i={i} />)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
