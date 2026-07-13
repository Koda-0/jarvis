import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiLayers, FiCpu, FiZap } from 'react-icons/fi';
import SectionHeader from '../common/SectionHeader';

const TIMELINE = [
  { year: '2024', title: 'Journey Started',  desc: 'Started Software Development studies at Institut Don Bosco Kabarondo TSS.', icon: '🎓', color: 'from-primary-500 to-primary-700' },
  { year: '2025', title: 'First Hackathon',  desc: 'Participated in my first hackathon called Hack with me and collaborated with fellow developers.',   icon: '🏆', color: 'from-accent-500 to-accent-700' },
  { year: '2026', title: 'Internship',        desc: 'Software Development Intern at Solvit Africa.',                                 icon: '💼', color: 'from-primary-400 to-accent-500' },
];

const HIGHLIGHTS = [
  { icon: FiCode,   label: 'Clean Code',    desc: 'Readable & maintainable' },
  { icon: FiLayers, label: 'Full Stack',    desc: 'Frontend & backend' },
  { icon: FiCpu,    label: 'Problem Solver',desc: 'Analytical thinking' },
  { icon: FiZap,    label: 'Fast Learner',  desc: 'Adapts quickly' },
];

function TimelineItem({ item, i, last }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.15 }}
      className={`flex gap-6 items-start ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Content */}
      <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
        <div className="glass-sm p-5">
          <span className="text-xs font-bold text-primary-400 mb-1 block">{item.year}</span>
          <h4 className="font-display font-semibold text-white text-lg mb-1.5">{item.title}</h4>
          <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
        </div>
      </div>
      {/* Node */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: i * 0.15 + 0.2 }}
          className={`w-14 h-14 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl
                      shadow-[0_0_20px_rgba(99,102,241,0.35)] z-10`}>
          {item.icon}
        </motion.div>
        {!last && (
          <motion.div initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.7, delay: i * 0.15 + 0.35 }}
            className="w-px h-16 bg-gradient-to-b from-primary-500/50 to-transparent origin-top" />
        )}
      </div>
      <div className="flex-1" />
    </motion.div>
  );
}

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="section-wrap bg-dark-900">
      <div className="container">
        <SectionHeader eyebrow="About Me" title="Crafting Digital Experiences" subtitle="That Matter" />

        {/* Bio grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Image panel */}
          <motion.div ref={ref} initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }} className="relative hidden lg:block">
            <div className="relative aspect-square max-w-md mx-auto">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 rounded-3xl border border-primary-500/20" />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-10 rounded-3xl border border-accent-500/15" />
              <div className="absolute inset-16 glass flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 rounded-full mb-4 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                     style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
                  <span className="font-display font-black text-white text-3xl">S</span>
                </div>
                <h3 className="font-display font-bold text-white text-sm">NGAMBA ISHIMWE Sabri</h3>
                <p className="text-primary-400 text-xs mt-1">Full Stack Developer</p>
                <p className="text-slate-500 text-xs mt-1 flex items-center gap-1"><span>📍</span>Kigali, Rwanda</p>
              </div>
              {[{l:'React.js','p':'top-0 left-0'},{l:'Node.js','p':'top-0 right-0'},{l:'MongoDB','p':'bottom-0 left-0'},{l:'Tailwind','p':'bottom-0 right-0'}]
                .map(({l,p}) => (
                  <motion.div key={l} animate={{ y: [0,-8,0] }} transition={{ duration: 3+Math.random()*2, repeat: Infinity }}
                    className={`absolute ${p} glass-sm px-2.5 py-1 text-xs font-semibold text-primary-300`}>{l}</motion.div>
              ))}
            </div>
          </motion.div>

          {/* Text */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}>
            <h3 className="font-display font-bold text-white text-2xl mb-5">
              Hello, I'm <span className="grad-text">NGAMBA ISHIMWE Sabri</span>
            </h3>
            <div className="space-y-4 text-slate-400 leading-relaxed mb-8 text-sm md:text-base">
              <p>A student at <strong className="text-white">Institut Don Bosco Kabarondo TSS</strong> with a passion for crafting innovative digital solutions from Rwanda.</p>
              <p>I've developed skills in software development, web development, UI/UX design, and IT consulting — transforming ideas into modern digital products that solve real-world problems.</p>
              <p>Outside coding, I enjoy gaming, exploring emerging technologies, and contributing to open-source communities.</p>
              <p>Currently expanding expertise in <span className="text-primary-400">software engineering</span>, <span className="text-primary-400">cloud technologies</span>, and <span className="text-primary-400">modern web development</span>.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {HIGHLIGHTS.map(({ icon: Icon, label, desc }) => (
                <motion.div key={label} whileHover={{ y: -3 }} className="glass-sm p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-primary-400 text-sm" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{label}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-12">
          <h3 className="font-display font-bold text-white text-3xl mb-2">
            My <span className="grad-text">Journey</span>
          </h3>
          <p className="text-slate-500 text-sm">Milestones that shaped who I am</p>
        </motion.div>
        <div className="max-w-3xl mx-auto space-y-8">
          {TIMELINE.map((item, i) => (
            <TimelineItem key={item.year} item={item} i={i} last={i === TIMELINE.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
