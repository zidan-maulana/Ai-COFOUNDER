// src/utils/api.js
import axios from 'axios';

// Base URL dari backend
// Gunakan environment variable atau default ke localhost
const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - Tambahkan token ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle error dan refresh token
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Jika error 403 (token expired) dan belum retry
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        // Request new access token
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken
        });

        const { accessToken } = response.data.data;

        // Simpan token baru
        localStorage.setItem('accessToken', accessToken);

        // Retry request dengan token baru
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Jika refresh token juga gagal, logout user
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ==========================================
// AUTH API
// ==========================================
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: (refreshToken) => api.post('/auth/logout', { refreshToken }),
  getProfile: () => api.get('/auth/profile'),
  refreshToken: (refreshToken) => api.post('/auth/refresh', { refreshToken })
};

// ==========================================
// CHAT API
// ==========================================
export const chatAPI = {
  sendMessage: (data) => api.post('/chat/send', data),
  getHistory: () => api.get('/chat/history'),
  deleteChat: (chatId) => api.delete(`/chat/${chatId}`)
};

// ==========================================
// WORKFLOW API
// ==========================================
export const workflowAPI = {
  create: (data) => api.post('/workflows', data),
  getAll: () => api.get('/workflows'),
  getById: (id) => api.get(`/workflows/${id}`),
  update: (id, data) => api.put(`/workflows/${id}`, data),
  delete: (id) => api.delete(`/workflows/${id}`),
  toggleStatus: (id) => api.patch(`/workflows/${id}/toggle`)
};

// ==========================================
// ANALYTICS API
// ==========================================
export const analyticsAPI = {
  getAll: (params) => api.get('/analytics', { params }),
  getKPI: () => api.get('/analytics/kpi'),
  getCharts: (timeRange) => api.get('/analytics/charts', { params: { timeRange } }),
  getTopProducts: () => api.get('/analytics/top-products'),
  getRecentActivities: () => api.get('/analytics/activities')
};

// ==========================================
// BILLING API
// ==========================================
export const billingAPI = {
  getCurrentPlan: () => api.get('/billing/plan'),
  getInvoices: () => api.get('/billing/invoices'),
  getPaymentMethods: () => api.get('/billing/payment-methods'),
  addPaymentMethod: (data) => api.post('/billing/payment-methods', data),
  deletePaymentMethod: (id) => api.delete(`/billing/payment-methods/${id}`),
  downloadInvoice: (invoiceId) => api.get(`/billing/invoices/${invoiceId}/download`, {
    responseType: 'blob'
  })
};

export default api;