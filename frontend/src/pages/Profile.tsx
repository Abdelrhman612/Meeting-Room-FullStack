import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";
import { User, Shield, Calendar, Users, AlertTriangle } from "lucide-react";
import type { ProfileData } from "../types";

const Profile: React.FC = () => {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "details">(
    "overview",
  );

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get("/api/Auth/profile");
      setProfile(response.data);
    } catch (err: any) {
      console.error("Failed to load profile:", err);
      setError(
        err.response?.data?.message ||
          "Unable to load profile. Please try again.",
      );

      // Fallback to auth user data if available
      if (authUser) {
        setProfile({
          id: authUser.id,
          name: authUser.name,
          email: authUser.email,
          role: authUser.role || "User",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-gray-200 rounded-lg w-64"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-32 bg-white rounded-xl shadow-sm"
                  ></div>
                ))}
              </div>
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-40 bg-white rounded-xl shadow-sm"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Profile Not Found
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {error ||
                "We couldn't load your profile information. Please try refreshing the page."}
            </p>
            <button
              onClick={loadProfile}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">My Profile</h1>
          <p className="text-gray-600">
            View and manage your account information
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Card & Stats */}
          <div className="lg:col-span-1 space-y-8">
            {/* User Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {profile.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {profile.role}
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {profile.name}
                </h2>
                <p className="text-gray-600 mb-6">{profile.email}</p>

                <div className="w-full space-y-4">
                  <div className="text-left">
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      User ID
                    </label>
                    <p className="text-gray-900 font-mono text-sm bg-gray-50 p-2 rounded-lg">
                      {profile.id}
                    </p>
                  </div>

                  {profile.createdAt && (
                    <div className="text-left">
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Member Since
                      </label>
                      <p className="text-gray-900">
                        {formatDate(profile.createdAt)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Account Statistics
              </h3>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-100">Rooms Created</p>
                      <p className="text-2xl font-bold">0</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-100">Meetings Joined</p>
                      <p className="text-2xl font-bold">0</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-blue-500">
                  <p className="text-sm text-blue-100">Account Status</p>
                  <div className="flex items-center mt-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="font-medium">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs Navigation */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === "overview"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("details")}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === "details"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  Account Details
                </button>
              </div>

              <div className="p-8">
                {activeTab === "overview" ? (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Welcome Back!
                      </h3>
                      <p className="text-gray-600">
                        This is your personal dashboard where you can view your
                        account information and activity. Your profile is
                        managed securely and all data is encrypted.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <h4 className="font-bold text-gray-900">
                            Personal Information
                          </h4>
                        </div>
                        <p className="text-gray-600 text-sm">
                          View and manage your name, email, and other personal
                          details.
                        </p>
                      </div>

                      <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                            <Shield className="w-5 h-5 text-green-600" />
                          </div>
                          <h4 className="font-bold text-gray-900">
                            Account Security
                          </h4>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Monitor your account activity and security settings.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-6">
                        Account Details
                      </h3>

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name
                            </label>
                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-gray-900">{profile.name}</p>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address
                            </label>
                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-gray-900">{profile.email}</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Account Role
                            </label>
                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  profile.role === "Admin"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {profile.role}
                              </span>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Account Status
                            </label>
                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                <span className="text-green-700 font-medium">
                                  Active
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            User ID
                          </label>
                          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <code className="text-gray-900 font-mono text-sm break-all">
                              {profile.id}
                            </code>
                          </div>
                        </div>

                        {profile.createdAt && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Account Created
                            </label>
                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-gray-900">
                                {formatDate(profile.createdAt)}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <p className="text-sm text-gray-500">
                        Last updated: {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Information Notice */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Need to update your information?
                  </h4>
                  <p className="text-gray-700">
                    Contact your system administrator or support team to update
                    your personal details. All profile changes require
                    verification for security purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="mt-10 text-center">
          <button
            onClick={loadProfile}
            disabled={isLoading}
            className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className={`w-5 h-5 mr-2 ${isLoading ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {isLoading ? "Refreshing..." : "Refresh Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
