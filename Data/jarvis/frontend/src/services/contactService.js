import api from './api';
export const sendMessage = (data) => api.post('/message_me', data);
