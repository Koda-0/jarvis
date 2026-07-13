import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiImage } from 'react-icons/fi';
import { fetchProjects }                         from '../../store/slices/projectsSlice';
import { createProject, updateProject, deleteProject } from '../../services/projectService';
import CrudModal, { FormField, SaveBtn }          from './shared/CrudModal';
import { imgUrl }                                 from '../../utils/helpers';

function ProjectForm({ initial, onDone }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState:{errors,isSubmitting} } = useForm({
    defaultValues: initial || { title:'',description:'',link:'',type:'single' }
  });

  const onSubmit = async (data) => {
    const fd = new FormData();
    ['title','description','link','type'].forEach(k => fd.append(k, data[k]));
    if (data.img?.[0]) fd.append('image', data.img[0]);
    try {
      initial ? await updateProject(initial._id, fd) : await createProject(fd);
      toast.success(initial ? 'Project updated!' : 'Project created!');
      dispatch(fetchProjects()); onDone();
    } catch(e){ toast.error(e.response?.data?.message||'Failed'); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="Title *" error={errors.title?.message}>
        <input {...register('title',{required:'Required'})} className={`field ${errors.title?'err':''}`} placeholder="Project title" />
      </FormField>
      <FormField label="Description *" error={errors.description?.message}>
        <textarea rows={3} {...register('description',{required:'Required'})}
          className={`field resize-none ${errors.description?'err':''}`} placeholder="Brief description…" />
      </FormField>
      <FormField label="Link *" error={errors.link?.message}>
        <input {...register('link',{required:'Required'})} className={`field ${errors.link?'err':''}`} placeholder="https://…" />
      </FormField>
      <FormField label="Type">
        <select {...register('type')} className="field">
          <option value="single">Solo</option>
          <option value="collaborated">Collaborated</option>
        </select>
      </FormField>
      <FormField label="Cover Image">
        <input type="file" accept="image/*" {...register('img')} className="field text-sm" />
      </FormField>
      <div className="flex gap-3 pt-1">
        <SaveBtn isSubmitting={isSubmitting} label={initial?'Update':'Create'} />
      </div>
    </form>
  );
}

export default function DashboardProjects() {
  const dispatch = useDispatch();
  const { items: projects, loading } = useSelector(s => s.projects);
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing]       = useState(null);

  useEffect(() => { dispatch(fetchProjects()); }, [dispatch]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try { await deleteProject(id); toast.success('Deleted.'); dispatch(fetchProjects()); }
    catch { toast.error('Failed to delete'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-white text-3xl mb-1">Projects</h1>
          <p className="text-slate-500 text-sm">{projects.length} project{projects.length!==1?'s':''}</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary">
          <FiPlus /> New Project
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">{[...Array(4)].map((_,i)=>(
          <div key={i} className="glass-sm p-4 flex items-center gap-4 animate-pulse">
            <div className="skeleton w-14 h-14 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 rounded w-1/3" /><div className="skeleton h-3 rounded w-2/3" />
            </div>
          </div>
        ))}</div>
      ) : (
        <div className="space-y-4">
          {projects.map(p => (
            <motion.div key={p._id} initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }}
              className="glass-sm p-5 flex items-center gap-4">
              {p.Image
                ? <img src={imgUrl(p.Image)} alt={p.title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                : <div className="w-14 h-14 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <FiImage className="text-primary-400 text-xl" />
                  </div>}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold truncate">{p.title}</h3>
                <p className="text-slate-500 text-sm truncate">{p.description}</p>
              </div>
              <span className={`badge flex-shrink-0 ${p.type==='collaborated'?'badge-pink':'badge-blue'}`}>{p.type}</span>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => setEditing(p)}
                  className="p-2 rounded-lg hover:bg-primary-500/10 text-slate-500 hover:text-primary-400 transition-all" aria-label="Edit">
                  <FiEdit2 />
                </button>
                <button onClick={() => handleDelete(p._id)}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all" aria-label="Delete">
                  <FiTrash2 />
                </button>
              </div>
            </motion.div>
          ))}
          {!projects.length && <p className="text-center text-slate-600 py-12">No projects yet.</p>}
        </div>
      )}

      <CrudModal open={showCreate} onClose={() => setShowCreate(false)} title="New Project">
        <ProjectForm onDone={() => setShowCreate(false)} />
      </CrudModal>
      <CrudModal open={!!editing} onClose={() => setEditing(null)} title="Edit Project">
        {editing && <ProjectForm initial={editing} onDone={() => setEditing(null)} />}
      </CrudModal>
    </div>
  );
}
