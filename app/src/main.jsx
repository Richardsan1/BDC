import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import ProfessionalDetailPage from './pages/ProfessionalDetailPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/buscar" element={<SearchPage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/profissional/:id" element={<ProfessionalDetailPage />} />
            <Route path="/profissional/:id/agendar" element={<BookingPage />} />
            <Route path="/entrar" element={<LoginPage />} />
            <Route path="/cadastrar" element={<RegisterPage />} />
            <Route
              path="/painel"
              element={
                <ProtectedRoute tipos={['profissional', 'salao']}>
                  <ProfessionalDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route element={<Layout admin />}>
            <Route
              path="/admin"
              element={
                <ProtectedRoute tipos={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
