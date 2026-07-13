import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiGithub, FiLinkedin, FiSave } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function DashboardProfile() {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      name:     user?.name || 'Administrator',
      email:    user?.email || 'admin@online.com',
      bio:      'Full Stack Developer from Rwanda.',
      github:   'https://github.com/Koda-0',
      linkedin: 'https://www.linkedin.com/in/ishimwengamba-sabri-8ab36737b/',
    },
  });

  const onSubmit = async () => {
    await new Promise(r => setTimeout(r, 600));
    toast.success('Profile saved (local only — no profile API).');
  };

  return (
    <div>
      <h1 className="font-display font-bold text-white text-3xl mb-1">Profile</h1>
      <p className="text-slate-500 text-sm mb-8">Manage your personal information</p>

      <div className="glass max-w-2xl p-8">
        <div className="flex items-center gap-5 mb-8 pb-8 border-b border-white/[0.06]">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
               style={{ background:'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
            <span className="font-display font-black text-white text-3xl">{user?.name?.[0]||'A'}</span>
          </div>
          <div>
            <h2 className="font-display font-bold text-white text-xl">{user?.name||'Administrator'}</h2>
            <p className="text-primary-400 text-sm">Admin</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input {...register('name')} className="field pl-11" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input {...register('email')} className="field pl-11 opacity-60 cursor-not-allowed" disabled />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Bio</label>
            <textarea rows={3} {...register('bio')} className="field resize-none" placeholder="Short bio…" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">GitHub</label>
              <div className="relative">
                <FiGithub className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input {...register('github')} className="field pl-11" placeholder="https://github.com/…" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">LinkedIn</label>
              <div className="relative">
                <FiLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input {...register('linkedin')} className="field pl-11" placeholder="https://linkedin.com/…" />
              </div>
            </div>
          </div>
          <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60">
            <FiSave /> {isSubmitting ? 'Saving…' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
