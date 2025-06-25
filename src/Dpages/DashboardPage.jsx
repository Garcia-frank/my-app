import { Grid, TextField, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import StatusCard from '../components/dashboard/StatusCard';
import RecentPaymentRequests from '../components/dashboard/RecentPaymentRequest';
import ApprovalWorkflow from '../components/dashboard/ApprovalWorkFlow';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { paymentRequests } from '../mockData';
import { useState } from 'react';

function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Calculate stats for the status cards
  const pendingRequests = paymentRequests.filter(req => req.status === 'pending').length;
  const approvedRequests = paymentRequests.filter(req => req.status === 'approved').length;
  const rejectedRequests = paymentRequests.filter(req => req.status === 'rejected').length;
  
  const statusCards = [
    {
      icon: <AccessTimeIcon />,
      iconColor: '#f59e0b',
      iconBgColor: 'rgba(245, 158, 11, 0.1)',
      title: 'Pending',
      value: pendingRequests,
    },
    {
      icon: <CheckCircleIcon />,
      iconColor: '#10b981',
      iconBgColor: 'rgba(16, 185, 129, 0.1)',
      title: 'Approved',
      value: approvedRequests,
    },
    {
      icon: <CancelIcon />,
      iconColor: '#ef4444',
      iconBgColor: 'rgba(239, 68, 68, 0.1)',
      title: 'Rejected',
      value: rejectedRequests,
    },
    {
      icon: <HourglassEmptyIcon />,
      iconColor: '#3b82f6',
      iconBgColor: 'rgba(59, 130, 246, 0.1)',
      title: 'Processing',
      value: '0 days',
    },
  ];

  const handleNewPaymentRequest = () => {
    navigate('/new-request');
  };

  // Filter payments based on search and status
  const filteredPayments = paymentRequests.filter(payment => {
    const matchesSearch = searchQuery === '' || 
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.requester.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.beneficiary.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <PageHeader
        title="Payment Request Dashboard"
        subtitle="Manage and track payment requests across departments"
        buttonText="New Payment Request"
        onButtonClick={handleNewPaymentRequest}
      />
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statusCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatusCard
              icon={card.icon}
              iconColor={card.iconColor}
              iconBgColor={card.iconBgColor}
              title={card.title}
              value={card.value}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={9}>
          <TextField
            fullWidth
            placeholder="Search by request ID, requester, or beneficiary..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            select
            fullWidth
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            size="small"
          >
            <MenuItem value="all">All Statuses</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      
      <RecentPaymentRequests payments={filteredPayments} />
      <ApprovalWorkflow />
    </div>
  );
}

export default Dashboard;