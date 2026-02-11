import axios from 'axios';

const API_BASE_URL = 'http://localhost:5065/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Account API
export const accountAPI = {
  login: (credentials) => api.post('/account/login', credentials),
  register: (userData) => api.post('/account/register', userData),
};

// Stock API
export const stockAPI = {
  getAll: (queryParams) => api.get('/stock', { params: queryParams }),
  getById: (id) => api.get(`/stock/${id}`),
  create: (stockData) => api.post('/stock', stockData),
  update: (id, stockData) => api.put(`/stock/${id}`, stockData),
  delete: (id) => api.delete(`/stock/${id}`),
};

// Comment API
export const commentAPI = {
  getAll: () => api.get('/comments'),
  getById: (id) => api.get(`/comments/${id}`),
  create: (stockId, commentData) => api.post(`/comments/${stockId}`, commentData),
  update: (id, commentData) => api.put(`/comments/${id}`, commentData),
  delete: (id) => api.delete(`/comments/${id}`),
};

// Portfolio API
export const portfolioAPI = {
  getPortfolio: () => api.get('/portfolio'),
  addStock: (symbol) => api.post(`/portfolio?Symbol=${symbol}`),
  removeStock: (symbol) => api.delete(`/portfolio?Symbol=${symbol}`),
};

export default api;
