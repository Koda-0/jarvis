import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { NAV_LINKS } from '../../utils/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { user, logout }        = useAuth();
  const { isDark, toggle }      = useTheme();
  const location                = useLocation();
  const navigate                = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const handleNav = (link) => {
    setOpen(false);
    if (link.section) {
      if (location.pathname !== '/') { navigate('/'); setTimeout(() => scrollSection(link.section), 120); }
      else scrollSection(link.section);
    }
  };
  const scrollSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <motion.nav
        initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${scrolled ? 'glass-nav shadow-lg' : 'bg-transparent'}`}
      >
        <div className="container flex items-center justify-between h-16 lg:h-[70px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-[0_0_16px_rgba(99,102,241,0.5)]"
                 style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
              <span className="font-display font-black text-white text-sm">S</span>
            </div>
            <span className="font-display font-bold text-white text-lg tracking-tight">
              Sabri<span className="grad-text">.</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((l) => {
              const active = !l.section && location.pathname === l.href;
              return (
                <li key={l.label}>
                  {l.section
                    ? <button onClick={() => handleNav(l)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                          ${active ? 'text-primary-400 bg-primary-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                        {l.label}
                      </button>
                    : <Link to={l.href}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all block
                          ${active ? 'text-primary-400 bg-primary-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                        {l.label}
                      </Link>
                  }
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button onClick={toggle} aria-label="Toggle theme"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all">
              {isDark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
            </button>
            {user
              ? <div className="hidden lg:flex items-center gap-2">
                  <Link to="/dashboard" className="btn-primary text-sm py-2 px-4">Dashboard</Link>
                  <button onClick={logout} className="btn-ghost text-sm">Logout</button>
                </div>
              : <Link to="/login" className="hidden lg:inline-flex btn-primary text-sm py-2 px-5">Login</Link>
            }
            <button onClick={() => setOpen(o => !o)} aria-label="Menu"
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all">
              {open ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-16 inset-x-0 z-[99] glass-nav border-t border-white/5 overflow-hidden"
          >
            <div className="container py-4 flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <button key={l.label} onClick={() => handleNav(l)}
                  className="text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                  {l.label}
                </button>
              ))}
              <div className="pt-3 mt-1 border-t border-white/5">
                {user
                  ? <><Link to="/dashboard" className="block btn-primary text-sm text-center mb-2">Dashboard</Link>
                      <button onClick={logout} className="w-full text-sm text-red-400 text-center py-2">Logout</button></>
                  : <Link to="/login" className="block btn-primary text-sm text-center">Login</Link>
                }
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
