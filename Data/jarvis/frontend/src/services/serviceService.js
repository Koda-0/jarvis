import api from './api';

export const getServices    = ()       => api.get('/services');
export const createService  = (data)   => api.post('/services', data);
export const updateService  = (id, d)  => api.put(`/services/${id}`, d);
export const deleteService  = (id)     => api.delete(`/services/${id}`);
