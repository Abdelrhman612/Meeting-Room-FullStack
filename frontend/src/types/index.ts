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
}

export interface JoinRoomDto {
  roomId: number;
  userId: number;
}

export interface AuthResponse {
  token: string;
}

export interface SignInDto {
  email: string;
  password: string;
}

export interface SignUpDto {
  name: string;
  email: string;
  password: string;
  role: 'Admin' | 'User';
}

export interface ProfileData {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}