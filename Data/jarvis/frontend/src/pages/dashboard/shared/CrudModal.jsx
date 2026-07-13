import Modal from '../../../components/common/Modal';
import Spinner from '../../../components/common/Spinner';

export default function CrudModal({ open, onClose, title, children }) {
  return (
    <Modal open={open} onClose={onClose} title={title} maxW="max-w-lg">
      {children}
    </Modal>
  );
}

export function FormField({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

export function SaveBtn({ isSubmitting, label = 'Save' }) {
  return (
    <button type="submit" disabled={isSubmitting}
      className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
      {isSubmitting ? <><Spinner size="sm" className="text-white" /> Saving…</> : label}
    </button>
  );
}
