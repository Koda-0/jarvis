import { FiMail, FiInfo } from 'react-icons/fi';

export default function DashboardMessages() {
  return (
    <div>
      <h1 className="font-display font-bold text-white text-3xl mb-1">Messages</h1>
      <p className="text-slate-500 text-sm mb-8">Contact form submissions</p>
      <div className="glass max-w-lg mx-auto p-10 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-3xl bg-primary-500/10 flex items-center justify-center mb-5">
          <FiMail className="text-primary-400 text-3xl" />
        </div>
        <h2 className="font-display font-bold text-white text-xl mb-3">Messages Delivered to Email</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          Contact form messages are sent directly to{' '}
          <span className="text-primary-400">ishimwengambasabri@gmail.com</span> via Nodemailer.
          There is no database storage in the current backend setup.
        </p>
        <div className="mt-6 flex items-center gap-2 text-xs text-slate-600 bg-dark-900/60 px-4 py-3 rounded-xl">
          <FiInfo className="flex-shrink-0 text-primary-400" />
          Check your Gmail inbox for new contact messages.
        </div>
      </div>
    </div>
  );
}
