import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../store/slices/blogsSlice';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiArrowLeft } from 'react-icons/fi';
import { formatDate, imgUrl } from '../utils/helpers';
import { FullPage } from '../components/common/Spinner';

export default function BlogDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { items: blogs, loading } = useSelector(s => s.blogs);

  useEffect(() => { dispatch(fetchBlogs()); window.scrollTo(0,0); }, [dispatch]);

  const post    = blogs.find(b => b.slug === slug);
  const related = blogs.filter(b => b.slug !== slug).slice(0, 2);

  useEffect(() => { if (post) document.title = `${post.blogTitle} | Sabri`; }, [post]);

  if (loading) return <FullPage />;
  if (!post) return (
    <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center gap-4 pt-20">
      <h1 className="font-display font-bold text-white text-2xl">Post not found</h1>
      <Link to="/blogs" className="btn-primary">← Back to Blog</Link>
    </div>
  );

  const readTime = Math.max(1, Math.ceil(post.desc.split(/\s+/).length / 200));

  return (
    <div className="min-h-screen bg-dark-950 pt-24 pb-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}>
          <Link to="/blogs" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-400
                                       text-sm transition-colors mb-8">
            <FiArrowLeft /> Back to Blog
          </Link>
        </motion.div>

        <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
          className="font-display font-black text-white leading-tight tracking-tight mb-5"
          style={{ fontSize:'clamp(2rem,4vw,3rem)' }}>
          {post.blogTitle}
        </motion.h1>

        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
          className="flex flex-wrap items-center gap-5 text-slate-500 text-sm mb-8">
          <span className="flex items-center gap-1.5"><FiCalendar className="text-primary-400" />{formatDate(post.createdAt)}</span>
          <span className="flex items-center gap-1.5"><FiClock className="text-primary-400" />{readTime} min read</span>
        </motion.div>

        {post.image && (
          <motion.div initial={{ opacity:0, scale:0.98 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.25 }}
            className="rounded-2xl overflow-hidden aspect-video bg-dark-800 mb-10">
            <img src={imgUrl(post.image)} alt={post.blogTitle} className="w-full h-full object-cover" />
          </motion.div>
        )}

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
          className="glass p-8 md:p-12 mb-12">
          {post.desc.split('\n\n').map((p, i) => (
            <p key={i} className="text-slate-300 leading-relaxed text-base mb-5 last:mb-0 whitespace-pre-line">{p}</p>
          ))}
        </motion.div>

        {related.length > 0 && (
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}>
            <h2 className="font-display font-bold text-white text-2xl mb-6">Related Posts</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map(r => (
                <Link key={r._id} to={`/blogs/${r.slug}`}
                  className="glass overflow-hidden group card-hover no-underline block">
                  {r.image && (
                    <div className="h-36 overflow-hidden bg-gradient-to-br from-primary-900 to-accent-900">
                      <img src={imgUrl(r.image)} alt={r.blogTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-white text-sm line-clamp-2
                                   group-hover:text-primary-300 transition-colors mb-2">{r.blogTitle}</h3>
                    <p className="text-primary-400 text-xs font-semibold inline-flex items-center gap-1">
                      Read More <FiArrowLeft className="rotate-180" />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
