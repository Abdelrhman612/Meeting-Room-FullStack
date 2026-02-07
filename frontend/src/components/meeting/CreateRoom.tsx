import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { meetingService } from '../../services/meeting';
import { useAuth } from '../../hooks/useAuth';

const CreateRoom: React.FC = () => {
  const [roomName, setRoomName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!roomName.trim()) {
      setError('Room name is required');
      return;
    }

    setLoading(true);
    
    try {
      const room = await meetingService.createRoom(roomName);
      navigate(`/meeting/${room.code}`);
    } catch (err) {
      setError('Failed to create room');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Meeting Room</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleCreateRoom}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Room Name
          </label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter room name"
            required
          />
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Host: <span className="font-medium">{user?.name}</span>
          </p>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Room'}
        </button>
      </form>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          After creating the room, you'll receive a room code to share with others.
        </p>
      </div>
    </div>
  );
};

export default CreateRoom;