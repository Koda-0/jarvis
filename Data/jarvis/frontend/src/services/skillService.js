import api from './api';

export const getSkills    = ()        => api.get('/skills');
export const createSkill  = (data)    => api.post('/skills', data);
export const updateSkill  = (id, d)   => api.put(`/skills/${id}`, d);
export const deleteSkill  = (id)      => api.delete(`/skills/${id}`);
