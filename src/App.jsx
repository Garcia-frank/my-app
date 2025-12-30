import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
// Public Pages
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/Register';
import NotFound from './pages/Notfound';

// Private Pages
import Dashboard from './Dpages/DashboardPage';
import MyRequests from './Dpages/MyRequestsPage';
import PendingApprovals from './Dpages/PendingApprovalsPage';
import FinanceReports from './Dpages/FinanceReportsPage';
import NewPaymentRequest from './Dpages/NewPaymentRequest';
import NewUser from './Dpages/NewUser'; // Corrected import
// Admin Pages
import UserManagement from './Dpages/UserManagement';
import RoleConfiguration from './Dpages/RoleConfigurationPage';
import AuditLogs from './Dpages/AuditLogsPage';
// Theme
import theme from './theme/theme';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Private Routes - Protected by JWT check */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/my-requests" element={
              <ProtectedRoute>
                <Layout>
                  <MyRequests />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/new-request" element={
              <ProtectedRoute>
                <Layout>
                  <NewPaymentRequest />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/new-user" element={
              <ProtectedRoute>
                <Layout>
                  <NewUser />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/pending-approvals" element={
              <ProtectedRoute>
                <Layout>
                  <PendingApprovals />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/finance-reports" element={
              <ProtectedRoute>
                <Layout>
                  <FinanceReports />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/user-management" element={
              <ProtectedRoute>
                <Layout>
                  <UserManagement />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/role-configuration" element={
              <ProtectedRoute>
                <Layout>
                  <RoleConfiguration />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/audit-logs" element={
              <ProtectedRoute>
                <Layout>
                  <AuditLogs />
                </Layout>
              </ProtectedRoute>
            } />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;