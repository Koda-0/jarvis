import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiBookOpen } from 'react-icons/fi';
import { fetchBlogs }               from '../../store/slices/blogsSlice';
import { createBlog, updateBlog }   from '../../services/blogService';
import CrudModal, { FormField, SaveBtn } from './shared/CrudModal';
import { formatDate, imgUrl }       from '../../utils/helpers';

function BlogForm({ initial, onDone }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState:{errors,isSubmitting} } = useForm({
    defaultValues: initial || { blogTitle:'', desc:'' }
  });

  const onSubmit = async (data) => {
    const fd = new FormData();
    fd.append('blogTitle', data.blogTitle);
    fd.append('desc', data.desc);
    if (data.img?.[0]) fd.append('image', data.img[0]);
    try {
      initial ? await updateBlog(initial._id, fd) : await createBlog(fd);
      toast.success(initial?'Updated!':'Post published!');
      dispatch(fetchBlogs()); onDone();
    } catch(e){ toast.error(e.response?.data?.message||'Failed'); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="Title *" error={errors.blogTitle?.message}>
        <input {...register('blogTitle',{required:'Required'})} className={`field ${errors.blogTitle?'err':''}`} placeholder="Post title" />
      </FormField>
      <FormField label="Content *" error={errors.desc?.message}>
        <textarea rows={6} {...register('desc',{required:'Required'})}
          className={`field resize-none ${errors.desc?'err':''}`} placeholder="Write your post…" />
      </FormField>
      <FormField label={initial?'New Cover Image (optional)':'Cover Image *'} error={errors.img?.message}>
        <input type="file" accept="image/*"
          {...register('img',{required:!initial?'Image required':false})} className="field text-sm" />
      </FormField>
      <SaveBtn isSubmitting={isSubmitting} label={initial?'Update':'Publish'} />
    </form>
  );
}

export default function DashboardBlogs() {
  const dispatch = useDispatch();
  const { items: blogs, loading } = useSelector(s => s.blogs);
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing]       = useState(null);

  useEffect(() => { dispatch(fetchBlogs()); }, [dispatch]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-white text-3xl mb-1">Blog Posts</h1>
          <p className="text-slate-500 text-sm">{blogs.length} post{blogs.length!==1?'s':''}</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary"><FiPlus /> New Post</button>
      </div>

      <div className="space-y-4">
        {blogs.map(b => (
          <motion.div key={b._id} initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }}
            className="glass-sm p-5 flex items-center gap-4">
            {b.image
              ? <img src={imgUrl(b.image)} alt={b.blogTitle} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
              : <div className="w-16 h-16 rounded-xl bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                  <FiBookOpen className="text-rose-400 text-xl" />
                </div>}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold truncate mb-0.5">{b.blogTitle}</h3>
              <p className="text-slate-500 text-xs">{formatDate(b.createdAt)}</p>
            </div>
            <button onClick={() => setEditing(b)}
              className="p-2 rounded-lg hover:bg-primary-500/10 text-slate-500 hover:text-primary-400 transition-all" aria-label="Edit">
              <FiEdit2 />
            </button>
          </motion.div>
        ))}
        {!loading && !blogs.length && <p className="text-center text-slate-600 py-12">No posts yet.</p>}
      </div>

      <CrudModal open={showCreate} onClose={() => setShowCreate(false)} title="New Post">
        <BlogForm onDone={() => setShowCreate(false)} />
      </CrudModal>
      <CrudModal open={!!editing} onClose={() => setEditing(null)} title="Edit Post">
        {editing && <BlogForm initial={editing} onDone={() => setEditing(null)} />}
      </CrudModal>
    </div>
  );
}
