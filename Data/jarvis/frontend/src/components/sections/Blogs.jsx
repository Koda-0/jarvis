import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../store/slices/blogsSlice';
import { FiCalendar, FiArrowRight, FiBookOpen } from 'react-icons/fi';
import SectionHeader from '../common/SectionHeader';
import SearchBar from '../common/SearchBar';
import Pagination from '../common/Pagination';
import EmptyState from '../common/EmptyState';
import SkeletonCard from '../common/SkeletonCard';
import { PER_PAGE } from '../../utils/constants';
import { formatDate, imgUrl } from '../../utils/helpers';
import useDebounce from '../../hooks/useDebounce';

export default function Blogs({ limit }) {
  const dispatch = useDispatch();
  const { items: blogs, loading } = useSelector(s => s.blogs);
  const [q, setQ]     = useState('');
  const [page, setPage] = useState(1);
  const debQ = useDebounce(q, 250);

  useEffect(() => { dispatch(fetchBlogs()); }, [dispatch]);

  const filtered  = blogs.filter(b => b.blogTitle.toLowerCase().includes(debQ.toLowerCase()));
  const paginated = limit
    ? filtered.slice(0, limit)
    : filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = limit ? 1 : Math.ceil(filtered.length / PER_PAGE);

  return (
    <section id="blogs" className="section-wrap bg-dark-900">
      <div className="container">
        <SectionHeader eyebrow="Blog" title="Thoughts & Insights"
          subtitle="Articles about web development, design, and technology" />

        {!limit && (
          <div className="max-w-md mx-auto mb-12">
            <SearchBar value={q} onChange={setQ} placeholder="Search articles…" />
          </div>
        )}

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {[...Array(limit || 6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : paginated.length === 0 ? (
          <EmptyState icon={FiBookOpen} title="No posts yet"
            description={q ? `No posts match "${q}"` : 'Check back soon for new articles'} />
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {paginated.map((blog, i) => (
                <motion.article key={blog._id}
                  initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.55 }}
                  whileHover={{ y: -6 }} className="glass overflow-hidden group card-hover">
                  <div className="h-48 overflow-hidden bg-gradient-to-br from-primary-900 to-accent-900">
                    {blog.image && (
                      <img src={imgUrl(blog.image)} alt={blog.blogTitle} loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-slate-500 text-xs mb-3">
                      <FiCalendar className="text-primary-400" />
                      {formatDate(blog.createdAt)}
                    </div>
                    <h3 className="font-display font-bold text-white text-base mb-3 line-clamp-2
                                   group-hover:text-primary-300 transition-colors">
                      {blog.blogTitle}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4">{blog.desc}</p>
                    <Link to={`/blogs/${blog.slug}`}
                      className="inline-flex items-center gap-1.5 text-primary-400 hover:text-primary-300
                                 text-sm font-semibold transition-colors">
                      Read More <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
            {!limit && <Pagination current={page} total={totalPages} onChange={setPage} />}
            {limit && blogs.length > limit && (
              <div className="text-center mt-10">
                <Link to="/blogs" className="btn-secondary">View All Posts <FiArrowRight /></Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
