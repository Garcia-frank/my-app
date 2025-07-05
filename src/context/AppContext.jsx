// src/context/AppContext.jsx
import { createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [data, setData] = useState({
    currentPage: 'dashboard',
    requests: [
      { id: 'PR-2024-001', requester: 'John Smith', amount: 'F5,000.00', beneficiary: 'ABC Suppliers Ltd', status: 'Pending', date: '2024-01-15' },
      { id: 'PR-2024-002', requester: 'Sarah Johnson', amount: 'F2,500.00', beneficiary: 'Office Supplies Inc', status: 'Pending', date: '2024-01-14' },
      { id: 'PR-2024-003', requester: 'Michael Chen', amount: 'F7,500.00', beneficiary: 'Software Corp', status: 'Approved', date: '2024-01-13' },
    ],
    users: [
      { name: 'John Smith', email: 'john.smith@capitaltrading.com', role: 'Manager', status: 'Active', lastLogin: '2024-01-15 09:30' },
      { name: 'Sarah Johnson', email: 'sarah.johnson@capitaltrading.com', role: 'Employee', status: 'Active', lastLogin: '2024-01-14 16:45' },
      { name: 'Michael Chen', email: 'michael.chen@capitaltrading.com', role: 'Employee', status: 'Active', lastLogin: '2024-01-13 11:20' },
    ],
    recentActivity: [
      { user: 'Admin User', action: 'admin logged in', time: '2024-01-15 14:30', type: 'login' },
      { user: 'John Smith', action: 'approved payment request PR-2024-001', time: '2024-01-15 13:15', type: 'approval' },
      { user: 'Sarah Johnson', action: 'submitted new payment request', time: '2024-01-15 12:00', type: 'request' },
    ]
  });
  
  const updateCurrentPage = (page) => {
    setData(prev => ({ ...prev, currentPage: page }));
  };

  return (
    <AppContext.Provider value={{ data, setData, updateCurrentPage }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;