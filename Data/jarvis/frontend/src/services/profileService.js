import api from './api';
export const getProfile    = ()     => api.get('/profile');
export const updateProfile = (fd)   => api.put('/profile', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
export const downloadCV    = ()     => api.get('/profile/download-cv', { responseType: 'blob' });
