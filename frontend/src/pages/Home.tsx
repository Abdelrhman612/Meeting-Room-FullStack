import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Welcome to Video Meetings
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        Connect with anyone, anywhere through high-quality video meetings.
        Simple, secure, and free to use.
      </p>
      
      <div className="flex justify-center space-x-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md w-64">
          <div className="text-3xl mb-4">🎥</div>
          <h3 className="font-bold text-lg mb-2">Create Meeting</h3>
          <p className="text-gray-600 mb-4">Start a new meeting instantly</p>
          <Link
            to={user ? "/create-room" : "/login"}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Start Now
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md w-64">
          <div className="text-3xl mb-4">👥</div>
          <h3 className="font-bold text-lg mb-2">Join Meeting</h3>
          <p className="text-gray-600 mb-4">Join with a room code</p>
          <Link
            to={user ? "/join-room" : "/login"}
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Join Meeting
          </Link>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto text-left">
        <h2 className="text-2xl font-bold mb-4">Features</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            High-quality video and audio
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Screen sharing
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Secure and private
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            No time limits
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Works on all devices
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Free to use
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;