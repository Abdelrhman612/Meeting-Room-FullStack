import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Video, Users, User, Calendar } from "lucide-react";

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
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg">Start New Meeting</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Create a new meeting room and invite others
          </p>
          <Link
            to="/create-room"
            className="inline-block w-full text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Create Room
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-lg">Join Meeting</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Join an existing meeting with a room code
          </p>
          <Link
            to="/join-room"
            className="inline-block w-full text-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Join Room
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-blue-200">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-lg">My Profile</h3>
          </div>
          <p className="text-gray-600 mb-4">
            View and manage your profile information
          </p>

          <div className="mb-4 space-y-2 text-sm">
            <p className="flex items-center">
              <span className="font-medium text-gray-700 min-w-16">Name:</span>
              <span className="text-gray-900">{user?.name}</span>
            </p>
            <p className="flex items-center">
              <span className="font-medium text-gray-700 min-w-16">Email:</span>
              <span className="text-gray-900">{user?.email}</span>
            </p>
            <p className="flex items-center">
              <span className="font-medium text-gray-700 min-w-16">Role:</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user?.role === "Admin"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {user?.role}
              </span>
            </p>
          </div>

          <Link
            to="/profile"
            className="inline-block w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded hover:from-purple-700 hover:to-blue-700 transition-all transform hover:-translate-y-0.5"
          >
            View Full Profile
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-10 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <Calendar className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="font-bold text-lg">Recent Meetings</h3>
        </div>
        <div className="text-center py-8">
          <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
            <Video className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600 mb-2">No recent meetings</p>
          <p className="text-gray-500 text-sm">
            Start your first meeting to see your activity here
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 font-medium">Rooms Created</p>
              <p className="text-2xl font-bold text-blue-900">0</p>
            </div>
            <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
              <Video className="w-5 h-5 text-blue-700" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-medium">
                Meetings Joined
              </p>
              <p className="text-2xl font-bold text-green-900">0</p>
            </div>
            <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-green-700" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700 font-medium">
                Profile Status
              </p>
              <p className="text-lg font-bold text-purple-900">Complete ✓</p>
            </div>
            <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-purple-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
