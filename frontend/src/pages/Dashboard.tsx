import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {user?.name}! Here's what you can do.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-blue-500 text-4xl mb-4">🚀</div>
          <h3 className="font-bold text-lg mb-2">Start New Meeting</h3>
          <p className="text-gray-600 mb-4">
            Create a new meeting room and invite others
          </p>
          <Link
            to="/create-room"
            className="inline-block w-full text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Room
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-green-500 text-4xl mb-4">👥</div>
          <h3 className="font-bold text-lg mb-2">Join Meeting</h3>
          <p className="text-gray-600 mb-4">
            Join an existing meeting with a room code
          </p>
          <Link
            to="/join-room"
            className="inline-block w-full text-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Join Room
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-purple-500 text-4xl mb-4">📋</div>
          <h3 className="font-bold text-lg mb-2">My Profile</h3>
          <p className="text-gray-600 mb-4">
            View and edit your profile information
          </p>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Name:</span> {user?.name}
            </p>
            <p className="text-sm">
              <span className="font-medium">Email:</span> {user?.email}
            </p>
            <p className="text-sm">
              <span className="font-medium">Role:</span> {user?.role}
            </p>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="mt-10 bg-white rounded-lg shadow-md p-6">
        <h3 className="font-bold text-lg mb-4">Recent Meetings</h3>
        <p className="text-gray-600">
          No recent meetings. Start your first meeting!
        </p>
      </div>
    </div>
  );
};

export default Dashboard;