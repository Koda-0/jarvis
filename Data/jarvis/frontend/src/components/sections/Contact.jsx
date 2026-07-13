import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend, FiInstagram } from 'react-icons/fi';
import { sendMessage } from '../../services/contactService';
import SectionHeader from '../common/SectionHeader';
import Spinner from '../common/Spinner';
import { href } from 'react-router-dom';

const INFO = [
  { icon: FiMail,    label: 'Email',    val: 'ishimwengambasabri@gmail.com', href: 'mailto:ishimwengambasabri@gmail.com' },
  { icon: FiPhone,   label: 'Phone',    val: '+250 799 429 690',             href: 'tel:+250783993391' },
  { icon: FiMapPin,  label: 'Location', val: 'Kigali, Rwanda',            href: '#' },
  { icon: FiGithub,  label: 'GitHub',   val: 'github.com/Koda-0',           href: 'https://github.com/Koda-0' },
  { icon: FiLinkedin,label: 'LinkedIn', val: 'ishimwengamba-sabri',          href: 'https://www.linkedin.com/in/ishimwengamba-sabri-8ab36737b/' },
  { icon: FiInstagram, label: 'Instagram' , val: 'smiler_sabri', href:'https://instagram.com/smiler_sabri/'}
];

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await sendMessage(data);
      toast.success('Message sent! I\'ll get back to you soon.');
      reset();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to send. Please try again.');
    }
  };

  return (
    <section id="contact" className="section-wrap bg-dark-900">
      <div className="container">
        <SectionHeader eyebrow="Contact" title="Let's Work Together"
          subtitle="Have a project in mind? I'd love to hear from you." />

        <div className="grid lg:grid-cols-2 gap-14 items-start max-w-5xl mx-auto">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h3 className="font-display font-bold text-white text-2xl mb-3">
              Get In <span className="grad-text">Touch</span>
            </h3>
            <p className="text-slate-400 leading-relaxed mb-8 text-sm">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="space-y-3 mb-8">
              {INFO.map(({ icon: Icon, label, val, href }) => (
                <motion.a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer" whileHover={{ x: 4 }}
                  className="flex items-center gap-4 glass-sm p-4 group no-underline">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                                  group-hover:scale-110 transition-transform"
                       style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
                    <Icon className="text-white text-base" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider">{label}</p>
                    <p className="text-white font-medium text-sm">{val}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="glass p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Name *</label>
                  <input {...register('name',{required:'Name required',minLength:{value:2,message:'Min 2 chars'}})}
                    className={`field ${errors.name?'err':''}`} placeholder="Your name" />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Email *</label>
                  <input type="email" {...register('email',{required:'Email required',pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:'Invalid email'}})}
                    className={`field ${errors.email?'err':''}`} placeholder="your@email.com" />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Subject</label>
                <input {...register('subject')} className="field" placeholder="What's this about?" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Message *</label>
                <textarea rows={5} {...register('message',{required:'Message required',minLength:{value:10,message:'Min 10 chars'}})}
                  className={`field resize-none ${errors.message?'err':''}`} placeholder="Tell me about your project…" />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                {isSubmitting ? <><Spinner size="sm" className="text-white" /> Sending…</> : <><FiSend /> Send Message</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
