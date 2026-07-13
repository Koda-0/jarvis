import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiZap } from 'react-icons/fi';
import { fetchSkills }                           from '../../store/slices/skillsSlice';
import { createSkill, updateSkill, deleteSkill } from '../../services/skillService';
import CrudModal, { FormField, SaveBtn }          from './shared/CrudModal';

const CATS = ['frontend','backend','database','devops','other'];

function SkillForm({ initial, onDone }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState:{errors,isSubmitting} } = useForm({
    defaultValues: initial || { skillName:'', category:'frontend', level:80 }
  });

  const onSubmit = async (data) => {
    const payload = { ...data, level: Number(data.level) };
    try {
      initial ? await updateSkill(initial._id, payload) : await createSkill(payload);
      toast.success(initial ? 'Updated!' : 'Skill created!');
      dispatch(fetchSkills()); onDone();
    } catch(e){ toast.error(e.response?.data?.message||'Failed'); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="Skill Name *" error={errors.skillName?.message}>
        <input {...register('skillName',{required:'Required'})} className={`field ${errors.skillName?'err':''}`} placeholder="e.g. React.js" />
      </FormField>
      <FormField label="Category">
        <select {...register('category')} className="field">
          {CATS.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
        </select>
      </FormField>
      <FormField label="Level (1-100)" error={errors.level?.message}>
        <input type="number" min={1} max={100}
          {...register('level',{required:'Required',min:{value:1,message:'Min 1'},max:{value:100,message:'Max 100'}})}
          className={`field ${errors.level?'err':''}`} />
      </FormField>
      <SaveBtn isSubmitting={isSubmitting} label={initial?'Update':'Create'} />
    </form>
  );
}

export default function DashboardSkills() {
  const dispatch = useDispatch();
  const { items: skills, loading } = useSelector(s => s.skills);
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing]       = useState(null);

  useEffect(() => { dispatch(fetchSkills()); }, [dispatch]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;
    try { await deleteSkill(id); toast.success('Deleted.'); dispatch(fetchSkills()); }
    catch { toast.error('Failed'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-white text-3xl mb-1">Skills</h1>
          <p className="text-slate-500 text-sm">{skills.length} skill{skills.length!==1?'s':''}</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary"><FiPlus /> New Skill</button>
      </div>

      <div className="space-y-3">
        {skills.map(s => (
          <motion.div key={s._id} initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }}
            className="glass-sm p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                 style={{ background:'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
              <FiZap className="text-white text-base" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-white font-semibold text-sm">{s.skillName}</h3>
                <span className="text-primary-400 font-bold text-xs">{s.level}%</span>
              </div>
              <div className="bar-bg"><div className="bar-fill" style={{ width:`${s.level}%` }} /></div>
              <p className="text-slate-600 text-xs capitalize mt-1">{s.category}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(s)} className="p-2 rounded-lg hover:bg-primary-500/10 text-slate-500 hover:text-primary-400 transition-all"><FiEdit2 /></button>
              <button onClick={() => handleDelete(s._id)} className="p-2 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all"><FiTrash2 /></button>
            </div>
          </motion.div>
        ))}
        {!loading && !skills.length && <p className="text-center text-slate-600 py-12">No skills yet.</p>}
      </div>

      <CrudModal open={showCreate} onClose={() => setShowCreate(false)} title="New Skill">
        <SkillForm onDone={() => setShowCreate(false)} />
      </CrudModal>
      <CrudModal open={!!editing} onClose={() => setEditing(null)} title="Edit Skill">
        {editing && <SkillForm initial={editing} onDone={() => setEditing(null)} />}
      </CrudModal>
    </div>
  );
}
