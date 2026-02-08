import { useState, useEffect } from 'react';
import { authService } from '../services/auth';
import type { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { token } = await authService.signIn({ email, password });
      
    
      localStorage.setItem('token', token);      
      const user = await authService.getProfile();
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const user = await authService.signUp({ name, email, password, role: 'User' });
      return { success: true, user };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  
  


  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return { user, loading, login, register, logout  };
};