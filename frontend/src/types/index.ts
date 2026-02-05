export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User';
}

export interface Room {
  id: number;
  code: string;
  name: string;
  createdAt: string;
  hostUserId: number;
  hostUser: User;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}