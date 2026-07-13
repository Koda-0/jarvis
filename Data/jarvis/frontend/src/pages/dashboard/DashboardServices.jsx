import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiBriefcase } from 'react-icons/fi';
import { fetchServices }                               from '../../store/slices/servicesSlice';
import { createService, updateService, deleteService } from '../../services/serviceService';
import CrudModal, { FormField, SaveBtn }               from './shared/CrudModal';

function ServiceForm({ initial, onDone }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState:{errors,isSubmitting} } = useForm({
    defaultValues: initial || { serviceName:'', icon:'briefcase', serviceDesc:'' }
  });

  const onSubmit = async (data) => {
    try {
      initial ? await updateService(initial._id, data) : await createService(data);
      toast.success(initial?'Updated!':'Service created!');
      dispatch(fetchServices()); onDone();
    } catch(e){ toast.error(e.response?.data?.message||'Failed'); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="Service Name *" error={errors.serviceName?.message}>
        <input {...register('serviceName',{required:'Required'})} className={`field ${errors.serviceName?'err':''}`} placeholder="e.g. Web Development" />
      </FormField>
      <FormField label="Icon Key *" error={errors.icon?.message}>
        <input {...register('icon',{required:'Required'})} className={`field ${errors.icon?'err':''}`}
          placeholder="code / layout / briefcase / settings / cloud / database" />
        <p className="text-slate-600 text-xs mt-1">Use one of the keys above</p>
      </FormField>
      <FormField label="Description *" error={errors.serviceDesc?.message}>
        <textarea rows={4} {...register('serviceDesc',{required:'Required'})}
          className={`field resize-none ${errors.serviceDesc?'err':''}`} placeholder="Describe this service…" />
      </FormField>
      <SaveBtn isSubmitting={isSubmitting} label={initial?'Update':'Create'} />
    </form>
  );
}

export default function DashboardServices() {
  const dispatch = useDispatch();
  const { items: services, loading } = useSelector(s => s.services);
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing]       = useState(null);

  useEffect(() => { dispatch(fetchServices()); }, [dispatch]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;
    try { await deleteService(id); toast.success('Deleted.'); dispatch(fetchServices()); }
    catch { toast.error('Failed'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-white text-3xl mb-1">Services</h1>
          <p className="text-slate-500 text-sm">{services.length} service{services.length!==1?'s':''}</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary"><FiPlus /> New Service</button>
      </div>

      <div className="space-y-4">
        {services.map(s => (
          <motion.div key={s._id} initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }}
            className="glass-sm p-5 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
              <FiBriefcase className="text-emerald-400 text-base" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">{s.serviceName}</h3>
              <p className="text-slate-500 text-sm line-clamp-2">{s.serviceDesc}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => setEditing(s)} className="p-2 rounded-lg hover:bg-primary-500/10 text-slate-500 hover:text-primary-400 transition-all"><FiEdit2 /></button>
              <button onClick={() => handleDelete(s._id)} className="p-2 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all"><FiTrash2 /></button>
            </div>
          </motion.div>
        ))}
        {!loading && !services.length && <p className="text-center text-slate-600 py-12">No services yet.</p>}
      </div>

      <CrudModal open={showCreate} onClose={() => setShowCreate(false)} title="New Service">
        <ServiceForm onDone={() => setShowCreate(false)} />
      </CrudModal>
      <CrudModal open={!!editing} onClose={() => setEditing(null)} title="Edit Service">
        {editing && <ServiceForm initial={editing} onDone={() => setEditing(null)} />}
      </CrudModal>
    </div>
  );
}
