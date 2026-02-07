import api from './api';
import type { JoinRoomDto, Room } from '../types';
export const meetingService = {
  createRoom: async (name: string): Promise<Room> => {
    const response = await api.post('/api/rooms', { name });
    return response.data;
  },

  getRoom: async (code: string): Promise<Room> => {
    const response = await api.get(`/api/rooms/${code}`);
    return response.data;
  },

  joinRoom: async (data: JoinRoomDto): Promise<void> => {
    await api.post('/api/RoomUser/join', data);
  },

  leaveRoom: async (data: JoinRoomDto): Promise<void> => {
    await api.post('/api/RoomUser/leave', data);
  },

  getRoomUsers: async (roomId: number): Promise<number[]> => {
    const response = await api.get(`/api/RoomUser/${roomId}/users`);
    return response.data.userIds;
  },
};