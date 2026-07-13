import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/common/Spinner';

export default function Login() {
  const { login }  = useAuth();
  const navigate   = useNavigate();
  const [show, setShow] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary-600/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-accent-600/15 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }} className="glass p-10 w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                 style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
              <span className="font-display font-black text-white">S</span>
            </div>
            <span className="font-display font-bold text-white text-xl">Sabri<span className="grad-text">.</span></span>
          </Link>
          <h1 className="font-display font-bold text-white text-2xl mb-1">Welcome Back</h1>
          <p className="text-slate-500 text-sm">Sign in to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Email</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="email" autoComplete="email" placeholder="Email"
                {...register('email',{required:'Email required'})}
                className={`field pl-11 ${errors.email?'err':''}`} />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type={show?'text':'password'} autoComplete="current-password" placeholder="••••••••"
                {...register('password',{required:'Password required'})}
                className={`field pl-11 pr-11 ${errors.password?'err':''}`} />
              <button type="button" onClick={() => setShow(s=>!s)} aria-label={show?'Hide':'Show'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                {show ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
              <input type="checkbox" className="rounded border-slate-600 bg-dark-800 text-primary-500" />
              Remember me
            </label>
            <button type="button" className="text-primary-400 hover:text-primary-300 transition-colors">Forgot password?</button>
          </div>

          <button type="submit" disabled={isSubmitting}
            className="btn-primary w-full justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed">
            {isSubmitting ? <><Spinner size="sm" className="text-white" /> Signing in…</> : <><FiLogIn className="text-base" /> Sign In</>}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-slate-500 hover:text-primary-400 text-sm transition-colors">← Back to Portfolio</Link>
        </div>
      </motion.div>
    </div>
  );
}
