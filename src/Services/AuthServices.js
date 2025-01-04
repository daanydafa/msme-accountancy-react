import axios from 'axios';

class AuthService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:8000/api'
    });

    this.axiosInstance.interceptors.request.use((config) => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          await this.logout();
        }
        return Promise.reject(error);
      }
    );
  }

  async login(credentials) {
    try {
      const response = await this.axiosInstance.post('/login', credentials);
      const { token, name } = response.data.data;

      localStorage.setItem('token', token);
      localStorage.setItem('name', name);

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  async logout() {
    try {
      if (this.token) {
        await this.axiosInstance.post('/logout');
      }
    } finally {
      this.clearSession();
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  clearSession() {
    localStorage.clear();
  }

  isAuthenticated() {
    return !!this.token;
  }

  get http() {
    return this.axiosInstance;
  }
}

export const authService = new AuthService();