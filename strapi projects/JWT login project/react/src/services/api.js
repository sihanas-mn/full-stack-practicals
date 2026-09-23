import axios from 'axios';

export const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sms_jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (identifier, password) => {
    const response = await api.post('/auth/local', { identifier, password });
    return response.data;
  },
  getMe: async () => {
    // Populate role
    const response = await api.get('/users/me?populate=role');
    return response.data;
  },
};

export const studentService = {
  getAll: async () => {
    const response = await api.get('/students?sort=createdAt:desc');
    return response.data;
  },
  create: async (studentData) => {
    const response = await api.post('/students', { data: studentData });
    return response.data;
  },
  update: async (documentId, studentData) => {
    const response = await api.put(`/students/${documentId}`, { data: studentData });
    return response.data;
  },
  delete: async (documentId) => {
    const response = await api.delete(`/students/${documentId}`);
    return response.data;
  },
};

export default api;
