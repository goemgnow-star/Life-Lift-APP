import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import Home from '../pages/Home';
import Hope from '../pages/Hope';
import Study from '../pages/Study';
import Habits from '../pages/Habits';
import Journal from '../pages/Journal';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import { AuthProvider } from '../contexts/AuthContext';

const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/hope" element={<Hope />} />
          <Route path="/study" element={<Study />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
