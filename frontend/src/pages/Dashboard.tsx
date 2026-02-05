import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import type { Room } from '../types';


const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [newRoomName, setNewRoomName] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      // TODO: Implement API endpoint for user's rooms
      // const response = await api.get('/api/rooms/my-rooms');
      // setRooms(response.data);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) return;

    try {
      const response = await api.post('/api/rooms', {
        name: newRoomName,
        hostUserId: user?.id,
      });
      
      setRooms([response.data, ...rooms]);
      setNewRoomName('');
    } catch (error) {
      console.error('Failed to create room:', error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-2 text-gray-600">
                Welcome back, {user?.name}! Ready for your next meeting?
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                to="/create-room"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create New Room
              </Link>
              <button
                onClick={() => navigator.clipboard.writeText('meeting-room-code')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Join Room
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Meetings</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">12</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Active Rooms</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">3</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Participants</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">48</dd>
            </div>
          </div>
        </div>

        {/* Recent Rooms */}
        <div className="mt-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-xl font-semibold text-gray-900">Recent Rooms</h2>
              <p className="mt-2 text-sm text-gray-700">
                A list of all your recent meeting rooms
              </p>
            </div>
          </div>
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {loading ? (
                <li className="px-4 py-4">Loading rooms...</li>
              ) : rooms.length > 0 ? (
                rooms.map((room) => (
                  <li key={room.id}>
                    <Link to={`/room/${room.code}`} className="block hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-600 font-semibold">
                                  {room.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {room.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                Code: {room.code}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(room.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="px-4 py-8 text-center text-gray-500">
                  No rooms yet. Create your first room to get started!
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;