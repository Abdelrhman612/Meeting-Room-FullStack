import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { meetingService } from '../../services/meeting';

const JoinRoom: React.FC = () => {
  const [roomCode, setRoomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!roomCode.trim()) {
      setError('Room code is required');
      return;
    }

    setLoading(true);
    
    try {
      const room = await meetingService.getRoom(roomCode);
      navigate(`/meeting/${room.code}`);
    } catch (err) {
      setError('Room not found or invalid code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Join Meeting Room</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleJoinRoom}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Room Code
          </label>
          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter room code (e.g., ABC123)"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Ask the host for the room code
          </p>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Joining...' : 'Join Room'}
        </button>
      </form>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Don't have a room?{' '}
          <button
            onClick={() => navigate('/create-room')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
};

export default JoinRoom;