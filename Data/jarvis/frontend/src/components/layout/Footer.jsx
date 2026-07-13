import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiMail, FiArrowUp, FiSend, FiFacebook } from 'react-icons/fi';
import { toast } from 'react-toastify';

const SOCIALS = [
  { icon: FiGithub,    href: 'https://github.com/Koda-0', label: 'GitHub' },
  { icon: FiLinkedin,  href: 'https://www.linkedin.com/in/ishimwengamba-sabri-8ab36737b/', label: 'LinkedIn' },
  { icon: FiFacebook,   href: 'https://facebook.com/Ishimwe-Sabri',                          label: 'Twitter' },
  { icon: FiInstagram, href: 'https://instagram.com/smiler_sabri', label: 'Instagram' },
  { icon: FiMail,      href: 'mailto:ishimwengambasabri@gmail.com', label: 'Email' },
];

const QUICK = [
  { label: 'About',    id: 'about' },
  { label: 'Skills',   id: 'skills' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog',     href: '/blogs' },
  { label: 'Contact',  id: 'contact' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Subscribed! Thanks for joining.');
    setEmail('');
  };

  return (
    <footer className="relative bg-dark-950 border-t border-white/[0.06] overflow-hidden isolate">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none -z-10" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-32
                      bg-primary-600/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="container relative z-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
                <span className="font-display font-black text-white text-sm">S</span>
              </div>
              <span className="font-display font-bold text-white text-lg">Sabri<span className="grad-text">.</span></span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              Full Stack Developer &amp; UI/UX Designer from Rwanda, building digital solutions. <br /> Founder of <b className='text-white'>SolveX</b>
            </p>
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <motion.a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer" whileHover={{ y: -3, scale: 1.1 }} aria-label={label}
                  className="w-9 h-9 rounded-lg glass-sm flex items-center justify-center
                             text-slate-400 hover:text-primary-400 transition-colors">
                  <Icon className="text-sm" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-widest mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {QUICK.map(({ label, id, href }) => (
                <li key={label}>
                  {id
                    ? <button onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-slate-500 hover:text-primary-400 text-sm transition-colors">
                        {label}
                      </button>
                    : <Link to={href} className="text-slate-500 hover:text-primary-400 text-sm transition-colors">{label}</Link>
                  }
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-widest mb-5">Contact</h3>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li>ishimwengambasabri@gmail.com</li>
              <li>+250 799 429 690</li>
              <li>Kigali, Rwanda</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-widest mb-5">Newsletter</h3>
            <p className="text-slate-500 text-sm mb-4">Stay updated with my latest work.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input value={email} onChange={e => setEmail(e.target.value)} type="email"
                placeholder="Your email" className="field text-sm py-2.5 flex-1" aria-label="Newsletter email" />
              <button type="submit" className="btn-primary py-2.5 px-3" aria-label="Subscribe">
                <FiSend className="text-sm" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4
                        pt-8 border-t border-white/[0.06]">
          <p className="text-slate-600 text-sm">© 2026 NGAMBA ISHIMWE Sabri. All Rights Reserved.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-9 h-9 rounded-xl flex items-center justify-center
                       transition-all hover:shadow-[0_0_12px_rgba(99,102,241,0.5)]"
            style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }} aria-label="Scroll to top">
            <FiArrowUp className="text-white text-sm" />
          </button>
        </div>
      </div>
    </footer>
  );
}
