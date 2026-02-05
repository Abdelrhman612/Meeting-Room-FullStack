import { api } from './api';

export interface Room {
  id: number;
  code: string;
  name: string;
  createdAt: string;
  hostUserId: number;
  hostUser: {
    id: number;
    name: string;
    email: string;
  };
}

export interface CreateRoomDto {
  name: string;
}

export const roomService = {
  // Create a new room
  async createRoom(name: string): Promise<Room> {
    const response = await api.post('/api/rooms', { name });
    return response.data;
  },

  // Get room by code
  async getRoomByCode(code: string): Promise<Room> {
    const response = await api.get(`/api/rooms/${code}`);
    return response.data;
  },

  // Get all rooms for current user
  async getMyRooms(): Promise<Room[]> {
    const response = await api.get('/api/rooms/my-rooms');
    return response.data;
  }
};