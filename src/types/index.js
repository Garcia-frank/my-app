// ========== Constants ==========
export const PaymentStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  PROCESSING: 'processing'
};

export const UserStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
};

export const ActionType = {
  LOGIN: 'login',
  PAYMENT_REQUEST: 'payment_request',
  APPROVAL: 'approval',
  USER_MANAGEMENT: 'user_management'
};

// ========== Object Templates ==========
export const PaymentRequestTemplate = {
  id: '',
  requester: '',
  amount: 0,
  beneficiary: '',
  purpose: '',
  status: PaymentStatus.PENDING,
  submittedDate: new Date().toISOString()
};

export const UserTemplate = {
  id: '',
  name: '',
  email: '',
  role: '',
  status: UserStatus.ACTIVE,
  lastLogin: new Date().toISOString()
};

export const RoleTemplate = {
  id: '',
  name: '',
  permissions: []
};

export const AuditLogTemplate = {
  id: '',
  user: '',
  action: '',
  timestamp: new Date().toISOString(),
  ipAddress: '0.0.0.0',
  actionType: ActionType.LOGIN
};

export const FinancialSummaryTemplate = {
  totalApproved: 0,
  pendingApproval: 0,
  rejected: 0,
  totalProcessed: 0
};

export const MonthlyDataPoint = {
  month: new Date().toISOString().slice(1, 13), // YYYY-MM format
  value: 0
};

// ========== Example Usage ==========
// Creating a new payment request
const newPayment = {
  ...PaymentRequestTemplate,
  id: 'pay_12345',
  requester: 'user_789',
  amount: 2499,
  beneficiary: 'supplier_456',
  purpose: 'Office supplies'
};

// Creating a new user
const newUser = {
  ...UserTemplate,
  id: 'user_101',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'approver'
};

// Creating an audit log entry
const loginAudit = {
  ...AuditLogTemplate,
  user: 'user_101',
  action: 'User logged in',
  ipAddress: '192.168.1.100'
};
