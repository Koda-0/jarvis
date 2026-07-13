import { useTheme } from '../../context/ThemeContext';
import { FiMoon, FiSun, FiGlobe, FiShield } from 'react-icons/fi';

const Row = ({ icon: Icon, title, desc, children }) => (
  <div className="flex items-start justify-between gap-6 py-5 border-b border-white/[0.06] last:border-0">
    <div className="flex items-start gap-4">
      <div className="w-9 h-9 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="text-primary-400 text-base" />
      </div>
      <div>
        <p className="text-white font-medium text-sm">{title}</p>
        <p className="text-slate-500 text-xs mt-0.5 max-w-xs">{desc}</p>
      </div>
    </div>
    <div className="flex-shrink-0">{children}</div>
  </div>
);

const Toggle = ({ on, onChange }) => (
  <button role="switch" aria-checked={on} onClick={() => onChange(!on)}
    className={`relative w-10 h-5 rounded-full transition-colors ${on ? 'bg-primary-600' : 'bg-slate-700'}`}>
    <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${on ? 'translate-x-5' : ''}`} />
  </button>
);

export default function DashboardSettings() {
  const { isDark, toggle } = useTheme();
  return (
    <div>
      <h1 className="font-display font-bold text-white text-3xl mb-1">Settings</h1>
      <p className="text-slate-500 text-sm mb-8">Application preferences</p>
      <div className="glass max-w-2xl p-8">
        <h2 className="font-display font-semibold text-white mb-2">Appearance</h2>
        <Row icon={isDark ? FiMoon : FiSun} title="Dark Mode" desc="Switch between dark and light theme">
          <Toggle on={isDark} onChange={toggle} />
        </Row>
        <h2 className="font-display font-semibold text-white mb-2 mt-4">Portfolio</h2>
        <Row icon={FiGlobe} title="Portfolio Live" desc="Your portfolio is publicly accessible">
          <span className="badge badge-green flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
          </span>
        </Row>
        <Row icon={FiShield} title="Dashboard Auth" desc="JWT authentication protects the dashboard">
          <span className="badge badge-blue">Secured</span>
        </Row>
      </div>
    </div>
  );
}
