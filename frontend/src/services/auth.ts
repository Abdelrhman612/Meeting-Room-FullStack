import type { AuthResponse, SignInDto, SignUpDto, User } from '../types';
import api from './api';


export const authService = {
  signIn: async (data: SignInDto): Promise<AuthResponse> => {
    const response = await api.post('/api/Auth/SignIn', data);
    return response.data;
  },

  signUp: async (data: SignUpDto): Promise<User> => {
    const response = await api.post('/api/Auth/SignUp', data);
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/api/users/profile');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};