import api from './api';

export const getProjects  = ()         => api.get('/projects');
export const createProject = (fd)      => api.post('/projects', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateProject = (id, fd)  => api.put(`/projects/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteProject = (id)      => api.delete(`/projects/${id}`);
