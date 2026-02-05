import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SignalRProvider } from './contexts/SignalRContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import CreateRoom from './pages/CreateRoom';
import MeetingRoom from './pages/MeetingRoom';
import ProtectedRoute from './components/ProtectedRoute';


const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <SignalRProvider>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/create-room" element={
                <ProtectedRoute>
                  <CreateRoom />
                </ProtectedRoute>
              } />
              <Route path="/room/:code" element={
                <ProtectedRoute>
                  <MeetingRoom />
                </ProtectedRoute>
              } />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </SignalRProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;