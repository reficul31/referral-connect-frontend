import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { DashboardPage } from './pages/DashboardPage/DashboardPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';

import './index.css';
import { ProtectedRoute } from './utils';
import { store } from './app/store';
import { AuthProvider } from './authProvider';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register/*" element={<RegisterPage />} />
            <Route path="/*" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
