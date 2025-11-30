import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import MarkAttendance from './pages/MarkAttendance';
import MyHistory from './pages/MyHistory';
import Profile from './pages/Profile';
import AllAttendance from './pages/AllAttendance';
import TeamCalendar from './pages/TeamCalendar';
import Reports from './pages/Reports';

import Sidebar from './components/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <div className="main">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Employee */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mark" element={<MarkAttendance />} />
            <Route path="/history" element={<MyHistory />} />
            <Route path="/profile" element={<Profile />} />

            {/* Manager */}
            <Route path="/manager" element={<ManagerDashboard />} />
            <Route path="/all-attendance" element={<AllAttendance />} />
            <Route path="/team-calendar" element={<TeamCalendar />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
