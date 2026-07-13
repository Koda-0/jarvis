import api from './api';

export const getBlogs    = ()        => api.get('/blogs');
export const createBlog  = (fd)      => api.post('/blogs', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateBlog  = (id, fd)  => api.put(`/blogs/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
