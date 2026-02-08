import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { User, Video, Plus, LogOut, LogIn, UserPlus, Home } from "lucide-react";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Logo & Navigation */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center text-xl font-bold text-gray-800"
            >
              <Video className="w-6 h-6 mr-2 text-blue-600" />
              VideoMeets
            </Link>

            {user && (
              <nav className="ml-10 hidden md:flex items-center space-x-2">
                <Link
                  to="/dashboard"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>

                <Link
                  to="/create-room"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Room
                </Link>

                <Link
                  to="/join-room"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Join Room
                </Link>

                {/* My Profile Button in Navigation */}
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
                >
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </Link>
              </nav>
            )}
          </div>

          {/* Right Section - User Info & Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* User Info with Profile Link */}
                <Link
                  to="/profile"
                  className="hidden md:flex items-center space-x-3 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </Link>

                {/* Mobile Profile Button */}
                <Link
                  to="/profile"
                  className="md:hidden flex items-center p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                >
                  <User className="w-5 h-5" />
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Login</span>
                </Link>

                <Link
                  to="/register"
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all transform hover:-translate-y-0.5"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {user && (
          <div className="md:hidden flex justify-around py-3 border-t border-gray-200">
            <Link
              to="/dashboard"
              className="flex flex-col items-center text-gray-600 hover:text-blue-600"
            >
              <Home className="w-5 h-5 mb-1" />
              <span className="text-xs">Home</span>
            </Link>

            <Link
              to="/create-room"
              className="flex flex-col items-center text-gray-600 hover:text-blue-600"
            >
              <Plus className="w-5 h-5 mb-1" />
              <span className="text-xs">Create</span>
            </Link>

            <Link
              to="/join-room"
              className="flex flex-col items-center text-gray-600 hover:text-blue-600"
            >
              <Video className="w-5 h-5 mb-1" />
              <span className="text-xs">Join</span>
            </Link>

            <Link
              to="/profile"
              className="flex flex-col items-center text-blue-600"
            >
              <User className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">Profile</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
