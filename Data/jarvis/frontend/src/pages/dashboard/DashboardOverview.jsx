import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiCode, FiZap, FiBriefcase, FiBookOpen, FiArrowRight } from 'react-icons/fi';
import { fetchProjects }  from '../../store/slices/projectsSlice';
import { fetchSkills }    from '../../store/slices/skillsSlice';
import { fetchServices }  from '../../store/slices/servicesSlice';
import { fetchBlogs }     from '../../store/slices/blogsSlice';

const STAT_CFG = [
  { key:'projects', label:'Total Projects', icon:FiCode,      grad:'from-primary-600 to-primary-700', href:'/dashboard/projects' },
  { key:'skills',   label:'Total Skills',   icon:FiZap,       grad:'from-accent-600 to-accent-700',   href:'/dashboard/skills' },
  { key:'services', label:'Services',        icon:FiBriefcase, grad:'from-emerald-600 to-teal-600',    href:'/dashboard/services' },
  { key:'blogs',    label:'Blog Posts',      icon:FiBookOpen,  grad:'from-rose-600 to-pink-600',       href:'/dashboard/blogs' },
];

/** Pure-JS animated counter — no external library */
function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!value) return;
    let current = 0;
    const step  = 16;
    const inc   = value / (1600 / step);
    const t = setInterval(() => {
      current += inc;
      if (current >= value) { setDisplay(value); clearInterval(t); }
      else setDisplay(Math.floor(current));
    }, step);
    return () => clearInterval(t);
  }, [value]);
  return <>{display}</>;
}

export default function DashboardOverview() {
  const dispatch = useDispatch();
  const { items: projects } = useSelector(s => s.projects);
  const { items: skills }   = useSelector(s => s.skills);
  const { items: services } = useSelector(s => s.services);
  const { items: blogs }    = useSelector(s => s.blogs);

  useEffect(() => {
    dispatch(fetchProjects()); dispatch(fetchSkills());
    dispatch(fetchServices()); dispatch(fetchBlogs());
  }, [dispatch]);

  const counts = {
    projects: projects.length,
    skills:   skills.length,
    services: services.length,
    blogs:    blogs.length,
  };

  return (
    <div>
      <h1 className="font-display font-bold text-white text-3xl mb-1">Dashboard</h1>
      <p className="text-slate-500 text-sm mb-8">Welcome back! Here's your portfolio overview.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {STAT_CFG.map(({ key, label, icon: Icon, grad, href }, i) => (
          <motion.div key={key}
            initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
            transition={{ delay: i * 0.08 }} whileHover={{ y:-4 }}
            className="glass p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center shadow-md`}>
                <Icon className="text-white text-xl" />
              </div>
              <Link to={href} className="text-slate-600 hover:text-primary-400 transition-colors">
                <FiArrowRight />
              </Link>
            </div>
            <div className="font-display font-black text-white text-3xl mb-0.5">
              <AnimatedNumber value={counts[key]} />
            </div>
            <p className="text-slate-500 text-sm">{label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {[
          { title:'Recent Projects', items:projects.slice(0,4), href:'/dashboard/projects', icon:FiCode,     col:'text-primary-400' },
          { title:'Recent Posts',    items:blogs.slice(0,4),    href:'/dashboard/blogs',    icon:FiBookOpen, col:'text-rose-400'    },
        ].map(({ title, items, href, icon: Icon, col }) => (
          <div key={title}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-white text-xl">{title}</h2>
              <Link to={href} className="text-primary-400 hover:text-primary-300 text-sm flex items-center gap-1">
                View All <FiArrowRight />
              </Link>
            </div>
            <div className="space-y-3">
              {items.map((item, i) => (
                <motion.div key={item._id}
                  initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }}
                  transition={{ delay: i * 0.06 }}
                  className="glass-sm p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary-500/10">
                    <Icon className={`${col} text-sm`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">
                      {'title' in item ? item.title : item.blogTitle}
                    </p>
                    <p className="text-slate-500 text-xs capitalize">
                      {'type' in item ? item.type : 'Blog post'}
                    </p>
                  </div>
                </motion.div>
              ))}
              {items.length === 0 && (
                <p className="text-slate-600 text-sm text-center py-6">None yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
