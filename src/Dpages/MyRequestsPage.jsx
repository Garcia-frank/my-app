import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import PageHeader from '../components/ui/PageHeader';
import paymentService from '../services/paymentService';

const statusColors = {
  pending: {
    bg: 'warning.light',
    color: 'warning.dark',
  },
  approved: {
    bg: 'success.light',
    color: 'success.dark',
  },
  rejected: {
    bg: 'error.light',
    color: 'error.dark',
  },
};

const MyRequests = () => {
  const navigate = useNavigate();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [myRequests, setMyRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await paymentService.getAllPayments();
        // In real app we would filter by current user here or backend
        setMyRequests(data);
      } catch (error) {
        console.error("Failed to fetch requests", error);
      }
    };
    fetchRequests();
  }, []);

  // Calculate stats
  const totalRequests = myRequests.length;
  const pendingRequests = myRequests.filter(req => req.status === 'pending').length;
  const approvedRequests = myRequests.filter(req => req.status === 'approved').length;

  const stats = [
    {
      value: totalRequests,
      label: 'Total Requests',
      bgColor: 'rgba(25, 118, 210, 0.1)',
      textColor: 'primary.main',
    },
    {
      value: pendingRequests,
      label: 'Pending Review',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      textColor: 'warning.main',
    },
    {
      value: approvedRequests,
      label: 'Approved',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      textColor: 'success.main',
    },
  ];

  const handleCreateNewRequest = () => {
    navigate('/new-request');
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
  };

  const handleCancelRequest = (request) => {
    setSelectedRequest(request);
    setCancelDialogOpen(true);
  };

  const confirmCancel = () => {
    // Simulate API call
    setCancelSuccess(true);
    setTimeout(() => {
      setCancelDialogOpen(false);
      setCancelSuccess(false);
      setSelectedRequest(null);
      // In a real app, we would refresh the data
    }, 2000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <PageHeader
        title="My Requests"
        primaryAction={
          <Button variant="contained" onClick={handleCreateNewRequest}>
            Create New Request
          </Button>
        }
        subtitle="View and manage your payment requests"
        buttonText="Create New Request"
        onButtonClick={handleCreateNewRequest}
      />

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={20}>
            {stats.map((stat, index) => (
              <Grid item xs={22} md={4} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    bgcolor: stat.bgColor,
                    borderRadius: 5,
                    p: 5,
                  }}
                >
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{ fontWeight: 'bold', color: stat.textColor, mb: 1 }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <TableContainer sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Request ID</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Purpose</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myRequests.length > 0 ? (
                  myRequests.map((request) => (
                    <TableRow key={request.id} hover>
                      <TableCell>{request.id}</TableCell>
                      <TableCell>{formatCurrency(request.amount)}</TableCell>
                      <TableCell>{request.purpose || 'N/A'}</TableCell>
                      <TableCell>
                        <Chip
                          label={request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          size="small"
                          sx={{
                            bgcolor: statusColors[request.status].bg,
                            color: statusColors[request.status].color,
                            fontWeight: 600,
                            fontSize: '0.75rem',
                          }}
                        />
                      </TableCell>
                      <TableCell>{request.submittedDate}</TableCell>
                      <TableCell>
                        <Link
                          component="button"
                          underline="hover"
                          color="primary"
                          onClick={() => handleViewRequest(request)}
                          sx={{ mr: 2, fontSize: '0.875rem' }}
                        >
                          View
                        </Link>
                        {request.status === 'pending' && (
                          <Link
                            component="button"
                            underline="hover"
                            color="error"
                            onClick={() => handleCancelRequest(request)}
                            sx={{ fontSize: '0.875rem' }}
                          >
                            Cancel
                          </Link>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Box sx={{ py: 3, textAlign: 'center' }}>
                        <Typography variant="body1" color="text.secondary">
                          You don't have any payment requests yet
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* View Request Dialog */}
      <Dialog
        open={!!selectedRequest && !cancelDialogOpen}
        onClose={() => setSelectedRequest(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Payment Request Details</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Request ID
            </Typography>
            <Typography variant="body1" gutterBottom>
              {selectedRequest?.id}
            </Typography>

            <Typography variant="subtitle2" color="text.secondary">
              Amount
            </Typography>
            <Typography variant="body1" gutterBottom>
              {selectedRequest && formatCurrency(selectedRequest.amount)}
            </Typography>

            <Typography variant="subtitle2" color="text.secondary">
              Beneficiary
            </Typography>
            <Typography variant="body1" gutterBottom>
              {selectedRequest?.beneficiary}
            </Typography>

            <Typography variant="subtitle2" color="text.secondary">
              Purpose
            </Typography>
            <Typography variant="body1" gutterBottom>
              {selectedRequest?.purpose || 'N/A'}
            </Typography>

            <Typography variant="subtitle2" color="text.secondary">
              Status
            </Typography>
            <Typography variant="body1" gutterBottom>
              <Chip
                label={selectedRequest?.status.charAt(0).toUpperCase() + selectedRequest?.status.slice(1)}
                size="small"
                sx={{
                  bgcolor: selectedRequest && statusColors[selectedRequest.status].bg,
                  color: selectedRequest && statusColors[selectedRequest.status].color,
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              />
            </Typography>

            <Typography variant="subtitle2" color="text.secondary">
              Submitted Date
            </Typography>
            <Typography variant="body1">
              {selectedRequest?.submittedDate}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedRequest(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Cancel Request Dialog */}
      <Dialog
        open={cancelDialogOpen}
        onClose={() => !cancelSuccess && setCancelDialogOpen(false)}
      >
        <DialogTitle>Cancel Payment Request</DialogTitle>
        <DialogContent>
          {cancelSuccess ? (
            <Alert severity="success" sx={{ mt: 2 }}>
              Request cancelled successfully!
            </Alert>
          ) : (
            <Typography sx={{ pt: 2 }}>
              Are you sure you want to cancel this payment request? This action cannot be undone.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          {!cancelSuccess && (
            <>
              <Button onClick={() => setCancelDialogOpen(false)}>No, Keep It</Button>
              <Button onClick={confirmCancel} color="error" variant="contained">
                Yes, Cancel Request
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyRequests;