import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Typography,
  Button,
  Stack,
  Divider,
  Paper,
  CircularProgress
} from '@mui/material';
import PageHeader from '../components/ui/PageHeader';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import paymentService from '../services/paymentService';
import { useNavigate } from 'react-router-dom';

const PendingApprovals = () => {
  const navigate = useNavigate();
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      const all = await paymentService.getAllPayments();
      setPendingApprovals(all.filter(req => req.status === 'pending'));
    } catch (error) {
      console.error("Failed to fetch pending approvals", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (requestId) => {
    try {
      await paymentService.updatePaymentStatus(requestId, 'Approved', 'Current User'); // Replace 'Current User' with actual user if available
      fetchPending();
    } catch (error) {
      console.error("Failed to approve", error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await paymentService.updatePaymentStatus(requestId, 'Rejected', 'Current User');
      fetchPending();
    } catch (error) {
      console.error("Failed to reject", error);
    }
  };

  const handleReview = (requestId) => {
    // Navigate to details or open modal
    console.log('Reviewing:', requestId);
  };

  // Format currency with comma separators and fixed 2 decimal places
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'XAF',
    }).format(amount);
  };

  return (
    <>
      <PageHeader
        title="Pending Approvals"
        subtitle="Review and approve payment requests"
      />

      <Card>
        <CardHeader
          title="Requests Awaiting Your Approval"
          sx={{
            '& .MuiCardHeader-title': {
              fontSize: '1.125rem',
              fontWeight: 600,
            },
          }}
        />
        <CardContent>
          <Stack spacing={2}>
            {pendingApprovals.length > 0 ? (
              pendingApprovals.map((approval) => (
                <Paper
                  key={approval.id}
                  variant="outlined"
                  sx={{ p: 2, borderRadius: 1 }}
                >
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 2, sm: 0 }
                  }}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {approval.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Submitted by: {approval.requester}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Amount: {formatCurrency(approval.amount)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Purpose: {approval.purpose || 'Not specified'}
                      </Typography>
                    </Box>
                    <Stack
                      direction={{ xs: 'column', md: 'row' }}
                      spacing={1}
                      sx={{ width: { xs: '100%', sm: 'auto' } }}
                    >
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={<CheckIcon />}
                        onClick={() => handleApprove(approval.id)}
                        fullWidth={false}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<CloseIcon />}
                        onClick={() => handleReject(approval.id)}
                        fullWidth={false}
                      >
                        Reject
                      </Button>
                      <Button
                        variant="contained"
                        color="info"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => handleReview(approval.id)}
                        fullWidth={false}
                      >
                        Review
                      </Button>
                    </Stack>
                  </Box>
                </Paper>
              ))
            ) : (
              <Box sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  No pending approvals at the moment
                </Typography>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default PendingApprovals;