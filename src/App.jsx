import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

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

function DashboardWrapper() {
  const [activePage, setActivePage] = useState('dashboard');
  const [adminSection, setAdminSection] = useState(null);

  const handleNavigation = (page) => {
    setActivePage(page);
    setAdminSection(null);
  };

  const handleAdminNavigation = (section) => {
    setActivePage('admin');
    setAdminSection(section);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'my-requests':
        return <MyRequests />;
      case 'new-request':
        return <NewPaymentRequest />;
      case 'new-user':
        return <NewUser />; // Added new case
      case 'pending-approvals':
        return <PendingApprovals />;
      case 'finance-reports':
        return <FinanceReports />;
      case 'admin':
        switch (adminSection) {
          case 'user-management':
            return <UserManagement />;
          case 'role-configuration':
            return <RoleConfiguration />;
          case 'audit-logs':
            return <AuditLogs />;
          case 'new-user':
            return <NewUser />; // Added admin section case
          default:
            return <UserManagement />;
        }
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout
      activePage={activePage}
      handleNavigation={handleNavigation}
      handleAdminNavigation={handleAdminNavigation}
    >
      {renderPage()}
    </Layout>
  );
}

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

            {/* Private Routes - Using DashboardWrapper for the layout pattern */}
            <Route path="/dashboard" element={
              <Layout>
                <Dashboard />
              </Layout>
            } />
        
            {/* Alternative Direct Routes */}
            <Route path="/my-requests" element={
              <Layout>
                <MyRequests />
              </Layout>
            } />
            <Route path="/new-request" element={
              <Layout>
                <NewPaymentRequest />
              </Layout>
            } />
            <Route path="/new-user" element={
              <Layout>
                <NewUser />
              </Layout>
            } />
            <Route path="/pending-approvals" element={
              <Layout>
                <PendingApprovals />
              </Layout>
            } />
            <Route path="/finance-reports" element={
              <Layout>
                <FinanceReports />
              </Layout>
            } />
            <Route path="/user-management" element={
              <Layout>
                <UserManagement />
              </Layout>
            } />
            <Route path="/role-configuration" element={
              <Layout>
                <RoleConfiguration />
              </Layout>
            } />
            <Route path="/audit-logs" element={
                <Layout>
                  <AuditLogs />
                </Layout>
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