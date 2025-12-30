import { Grid, TextField, MenuItem, Box, Typography, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import StatusCard from '../components/dashboard/StatusCard';
import RecentPaymentRequests from '../components/dashboard/RecentPaymentRequest';
import ApprovalWorkflow from '../components/dashboard/ApprovalWorkFlow';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import paymentService from '../services/paymentService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 3000 },
  { name: 'Mar', amount: 5000 },
  { name: 'Apr', amount: 2780 },
  { name: 'May', amount: 1890 },
  { name: 'Jun', amount: 2390 },
  { name: 'Jul', amount: 3490 },
  { name: 'Aug', amount: 4200 },
  { name: 'Sep', amount: 3100 },
  { name: 'Oct', amount: 5600 },
  { name: 'Nov', amount: 4800 },
  { name: 'Dec', amount: 6200 },
];

function Dashboard() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await paymentService.getAllPayments();
        setPayments(data);

        // Calculate chart data (simple example: grouping by month might be complex without real dates, 
        // will mock the distribution logic based on data present or use existing mock logic if data has no dates)
        // For now, let's keep static chart data or if dates exist, aggregate them.
        // Assuming we want dynamic stats at least:
      } catch (error) {
        console.error("Failed to fetch payments", error);
      }
    };
    fetchPayments();
  }, []);

  const pendingRequests = payments.filter(req => req.status === 'pending').length;
  const approvedRequests = payments.filter(req => req.status === 'approved').length;
  const rejectedRequests = payments.filter(req => req.status === 'rejected').length;

  const statusCards = [
    { icon: <AccessTimeIcon />, color: '#f59e0b', title: 'Pending', value: pendingRequests },
    { icon: <CheckCircleIcon />, color: '#10b981', title: 'Approved', value: approvedRequests },
    { icon: <CancelIcon />, color: '#ef4444', title: 'Rejected', value: rejectedRequests },
    { icon: <HourglassEmptyIcon />, color: '#3b82f6', title: 'Avg Process Time', value: '1.2 Days' },
  ];

  const handleNewPaymentRequest = () => navigate('/new-request');

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = searchQuery === '' ||
      String(payment.id).toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.requester.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.beneficiary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ width: '100%' }}>
      <PageHeader
        title="Command Center"
        subtitle="Intelligent oversight of cross-departmental payment operations"
        buttonText="New Request"
        onButtonClick={handleNewPaymentRequest}
      />

      <Grid container spacing={4} sx={{ mb: 6 }}>
        {statusCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <StatusCard
                icon={card.icon}
                iconColor={card.color}
                iconBgColor={`${card.color}15`}
                title={card.title}
                value={card.value}
              />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12}>
          <Paper variant="glass" sx={{ p: 4, height: 450 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Payment Volume Trends</Typography>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} interval={0} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="glass" sx={{ p: 4, height: 450 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Activity Distribution</Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Bar dataKey="amount" fill="#0f172a" radius={[6, 6, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h5" fontWeight="bold">Recent Transactions</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              placeholder="Search ID, Requester..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={1}>
            <TextField
              select
              fullWidth
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              size="small"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>

      <RecentPaymentRequests payments={filteredPayments} />
      <Box sx={{ mt: 4 }}>
        <ApprovalWorkflow />
      </Box>
    </Box>
  );
}

export default Dashboard;
