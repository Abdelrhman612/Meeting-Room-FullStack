import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Meeting Components
import CreateRoom from './components/meeting/CreateRoom';
import JoinRoom from './components/meeting/JoinRoom';
import MeetingRoom from './components/meeting/MeetingRoom';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout><Dashboard /></Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <Layout><Profile /></Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/create-room" element={
          <ProtectedRoute>
            <Layout><CreateRoom /></Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/join-room" element={
          <ProtectedRoute>
            <Layout><JoinRoom /></Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/meeting/:roomCode" element={
          <ProtectedRoute>
            <MeetingRoom />
          </ProtectedRoute>
        } />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;