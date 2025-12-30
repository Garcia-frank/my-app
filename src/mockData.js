// Mock payment requests
export const paymentRequests = [
  {
    id: 'PR-2024-001',
    requester: 'John Smith',
    amount: 5000,
    beneficiary: 'ABC Suppliers Ltd',
    purpose: 'Office Equipment',
    status: 'pending',
    submittedDate: '2024-01-15',
  },
  {
    id: 'PR-2024-002',
    requester: 'Sarah Johnson',
    amount: 2500,
    beneficiary: 'Office Supplies Inc',
    purpose: 'Office Supplies',
    status: 'pending',
    submittedDate: '2024-01-14',
  },
  {
    id: 'PR-2024-003',
    requester: 'Michael Chen',
    amount: 7500,
    beneficiary: 'Software Solutions',
    purpose: 'Software License Renewal',
    status: 'pending',
    submittedDate: '2024-01-13',
  },
];

// Mock users
export const users = [
  {
    id: 'USR-001',
    name: 'John Smith',
    email: 'john.smith@capitaltrading.com',
    role: 'Manager',
    status: 'active',
    lastLogin: '2024-01-15 09:30',
  },
  {
    id: 'USR-002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@capitaltrading.com',
    role: 'Employee',
    status: 'active',
    lastLogin: '2024-01-15 08:45',
  },
  {
    id: 'USR-003',
    name: 'Michael Chen',
    email: 'michael.chen@capitaltrading.com',
    role: 'Employee',
    status: 'active',
    lastLogin: '2024-01-14 16:20',
  },
];

// Mock roles
export const roles = [
  {
    id: 'ROLE-001',
    name: 'Administrator',
    permissions: ['Full System Access', 'User Management', 'Financial Reports', 'System Configuration'],
  },
  {
    id: 'ROLE-002',
    name: 'Manager',
    permissions: ['Approve Payments', 'View Reports', 'Team Management'],
  },
  {
    id: 'ROLE-003',
    name: 'Employee',
    permissions: ['Submit Requests', 'View Own Requests'],
  },
];

// Mock audit logs
export const auditLogs = [
  {
    id: 'LOG-001',
    user: 'John Smith',
    action: 'approved payment request PR-2024-001',
    timestamp: '2024-01-15 14:30:00',
    ipAddress: '192.168.1.10',
    actionType: 'approval',
  },
  {
    id: 'LOG-002',
    user: 'Sarah Johnson',
    action: 'submitted new payment request',
    timestamp: '2024-01-15 13:15:00',
    ipAddress: '192.168.1.25',
    actionType: 'payment_request',
  },
  {
    id: 'LOG-003',
    user: 'Admin User',
    action: 'logged into the system',
    timestamp: '2024-01-15 12:00:00',
    ipAddress: '192.168.1.5',
    actionType: 'login',
  },
];

// Mock financial summary
export const financialSummary = {
  totalApproved: 125000,
  pendingApproval: 45000,
  rejected: 5000,
  totalProcessed: 175000,
};

// Mock monthly data for charts
export const monthlyData = [
  { month: 'Jan', value: 15000 },
  { month: 'Feb', value: 25000 },
  { month: 'Mar', value: 18000 },
  { month: 'Apr', value: 32000 },
  { month: 'May', value: 28000 },
  { month: 'Jun', value: 35000 },
  { month: 'Jul', value: 29000 },
  { month: 'Aug', value: 38000 },
  { month: 'Sep', value: 42000 },
  { month: 'Oct', value: 31000 },
  { month: 'Nov', value: 45000 },
  { month: 'Dec', value: 52000 },
];

// Mock status distribution data for charts
export const statusDistribution = [
  { label: 'Approved', value: 65 },
  { label: 'Pending', value: 25 },
  { label: 'Rejected', value: 10 },
];