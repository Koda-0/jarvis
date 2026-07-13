import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiGrid, FiCode, FiBookOpen, FiZap, FiBriefcase, FiMail,
         FiUser, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const NAV = [
  { label: 'Dashboard', icon: FiGrid,      href: '/dashboard' },
  { label: 'Projects',  icon: FiCode,      href: '/dashboard/projects' },
  { label: 'Blogs',     icon: FiBookOpen,  href: '/dashboard/blogs' },
  { label: 'Skills',    icon: FiZap,       href: '/dashboard/skills' },
  { label: 'Services',  icon: FiBriefcase, href: '/dashboard/services' },
  { label: 'Messages',  icon: FiMail,      href: '/dashboard/messages' },
  { label: 'Profile',   icon: FiUser,      href: '/dashboard/profile' },
  { label: 'Settings',  icon: FiSettings,  href: '/dashboard/settings' },
];

function SidebarInner({ onClose }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (h) => h === '/dashboard' ? location.pathname === h : location.pathname.startsWith(h);

  const handleLogout = () => {
    logout(); toast.info('Logged out'); navigate('/login');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="h-[68px] flex items-center justify-between px-5 border-b border-white/[0.06]">
        <Link to="/" onClick={onClose} className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
            <span className="font-display font-black text-white text-xs">S</span>
          </div>
          <span className="font-display font-bold text-white">Sabri<span className="grad-text">.</span></span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors lg:hidden">
            <FiX className="text-xl" />
          </button>
        )}
      </div>

      <div className="px-4 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
               style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
            {user?.name?.[0] || 'A'}
          </div>
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm truncate">{user?.name || 'Administrator'}</p>
            <p className="text-slate-500 text-xs truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {NAV.map(({ label, icon: Icon, href }) => (
          <Link key={href} to={href} onClick={onClose}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all
              ${isActive(href)
                ? 'text-white shadow-[0_0_12px_rgba(99,102,241,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            style={isActive(href) ? { background:'linear-gradient(135deg,#4f46e5,#7c3aed)' } : {}}>
            <Icon className="text-base flex-shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-white/[0.06]">
        <button onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-medium
                     text-red-400 hover:bg-red-500/10 transition-all cursor-pointer">
          <FiLogOut className="text-base" /> Logout
        </button>
      </div>
    </div>
  );
}

export default function DashboardSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64
                        bg-dark-950 border-r border-white/[0.06] z-40">
        <SidebarInner />
      </aside>

      <button onClick={() => setMobileOpen(true)} aria-label="Open menu"
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl glass text-white">
        <FiMenu className="text-lg" />
      </button>

      {mobileOpen && (
        <>
          <div onClick={() => setMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
          <aside className="lg:hidden fixed left-0 top-0 h-full w-64 bg-dark-950 z-50
                            border-r border-white/[0.06]">
            <SidebarInner onClose={() => setMobileOpen(false)} />
          </aside>
        </>
      )}
    </>
  );
}
