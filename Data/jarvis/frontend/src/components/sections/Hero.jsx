import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiDownload, FiArrowRight } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../store/slices/projectsSlice';
import { fetchSkills }   from '../../store/slices/skillsSlice';
import { fetchServices } from '../../store/slices/servicesSlice';

const SOCIALS = [
  { icon: FiGithub,    href: 'https://github.com/Koda-0',        label: 'GitHub' },
  { icon: FiLinkedin,  href: 'https://www.linkedin.com/in/ishimwengamba-sabri-8ab36737b/', label: 'LinkedIn' },
  { icon: FiInstagram, href: 'https://instagram.com/smiler_sabri', label: 'Instagram' },
  { icon: FiMail,      href: 'mailto:ishimwengambasabri@gmail.com', label: 'Email' },
];

/** Pure-JS animated counter — no external library needed */
function AnimatedNumber({ value, active }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [active, value]);
  return <>{display}</>;
}

const Orb = ({ style, animate }) => (
  <motion.div className="absolute rounded-full pointer-events-none" style={style}
    animate={animate} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
);

export default function Hero() {
  const dispatch = useDispatch();
  const { items: projects } = useSelector(s => s.projects);
  const { items: skills }   = useSelector(s => s.skills);
  const { items: services } = useSelector(s => s.services);
  const { ref, inView }     = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchSkills());
    dispatch(fetchServices());
  }, [dispatch]);

  const stats = [
    { label: 'Projects',    value: projects.length || 0   },
    { label: 'Skills',      value: skills.length   || 0  },
    { label: 'Services',    value: services.length || 0   },
    { label: 'Years Exp',   value: 2                      },
  ];

  return (
    <section id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-950 pt-16 isolate">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none -z-10" />
      <Orb style={{ width: 500, height: 500, background: 'radial-gradient(circle,rgba(79,70,229,0.18),transparent)', top: '-10%', left: '-10%', zIndex: -1 }}
           animate={{ scale: [1,1.2,1], opacity:[0.6,0.9,0.6] }} />
      <Orb style={{ width: 400, height: 400, background: 'radial-gradient(circle,rgba(217,70,239,0.14),transparent)', bottom: '-8%', right: '-8%', zIndex: -1 }}
           animate={{ scale: [1,1.3,1], opacity:[0.5,0.8,0.5] }} />

      <div className="container relative z-10 py-20">
        {/* Glassmorphism card */}
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="glass p-8 md:p-14 max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            {/* Text */}
            <div>
              <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="eyebrow">👋 Welcome to My Portfolio</motion.span>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="font-display font-black text-white leading-none tracking-tight mt-2 mb-4"
                style={{ fontSize: 'clamp(2.6rem,6vw,4.8rem)' }}>
                NGAMBA ISHIMWE{' '}
                <span className="grad-text block">Sabri</span>
              </motion.h1>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-slate-400 font-medium mb-6 min-h-8">
                I'm a{' '}
                <TypeAnimation
                  sequence={['Software Developer',2000,'Full Stack Developer',2000,'UI/UX Designer',2000,'Problem Solver',2000,'ICT Consultant',2000]}
                  speed={50} repeat={Infinity}
                  className="grad-text font-semibold" />
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="text-slate-400 leading-relaxed mb-8 max-w-lg">
                A passionate developer from Rwanda, crafting innovative digital solutions and
                transforming ideas into modern products that solve real-world problems.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3 mb-8">
                <Link to="/projects" className="btn-primary">
                  <FiArrowRight className="text-base" /> View Projects
                </Link>
                <a href="#" download onClick={e => e.preventDefault()} className="btn-secondary">
                  <FiDownload className="text-base" /> Download CV
                </a>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-ghost text-base">Contact Me</button>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                className="flex items-center gap-3">
                <span className="text-slate-600 text-sm">Follow:</span>
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                    whileHover={{ y: -4, scale: 1.15 }} aria-label={label}
                    className="w-9 h-9 rounded-xl glass-sm flex items-center justify-center
                               text-slate-400 hover:text-primary-400 transition-colors">
                    <Icon className="text-sm" />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Visual */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hidden lg:flex flex-col items-center relative">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-primary-500/25" style={{ margin: '-20px' }} />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-accent-500/15" style={{ margin: '-40px' }} />

              <div className="w-56 h-56 rounded-full border-4 border-primary-500/25
                              flex items-center justify-center overflow-hidden"
                   style={{ background: 'linear-gradient(135deg,rgba(79,70,229,0.3),rgba(217,70,239,0.3))' }}>
                <span className="font-display font-black text-7xl text-white/10 select-none">S</span>
              </div>

              <motion.div animate={{ y: [0,-10,0] }} transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-2 -right-2 glass-sm px-3 py-1.5 text-xs font-semibold text-primary-300">
                💻 Full Stack Dev
              </motion.div>
              <motion.div animate={{ y: [0,10,0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-2 -left-2 glass-sm px-3 py-1.5 text-xs font-semibold text-pink-300">
                🎨 UI/UX Designer
              </motion.div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-10 border-t border-white/[0.06]">
            {stats.map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="font-display font-black grad-text mb-1" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.5rem)' }}>
                  <AnimatedNumber value={value} active={inView} />+
                </div>
                <div className="text-slate-500 text-sm">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
