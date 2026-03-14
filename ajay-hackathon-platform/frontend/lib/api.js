import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Hackathons
export const getHackathons = (params) => API.get('/hackathons', { params });
export const getHackathon = (id) => API.get(`/hackathons/${id}`);
export const getFeaturedHackathons = () => API.get('/hackathons/featured');

// Internships
export const getInternships = (params) => API.get('/internships', { params });
export const getInternship = (id) => API.get(`/internships/${id}`);
export const getFeaturedInternships = () => API.get('/internships/featured');

// User saved
export const getSaved = () => API.get('/users/saved');
export const saveOpportunity = (data) => API.post('/users/save', data);
export const unsaveOpportunity = (id) => API.delete(`/users/save/${id}`);

// Admin
export const adminCreateHackathon = (data) => API.post('/admin/hackathons', data);
export const adminUpdateHackathon = (id, data) => API.put(`/admin/hackathons/${id}`, data);
export const adminDeleteHackathon = (id) => API.delete(`/admin/hackathons/${id}`);

export const adminCreateInternship = (data) => API.post('/admin/internships', data);
export const adminUpdateInternship = (id, data) => API.put(`/admin/internships/${id}`, data);
export const adminDeleteInternship = (id) => API.delete(`/admin/internships/${id}`);

export default API;
