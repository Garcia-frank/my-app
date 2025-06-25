import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip, 
  Box, 
  Typography
} from '@mui/material';

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
  processing: {
    bg: 'info.light',
    color: 'info.dark',
  },
};

const RecentPaymentRequests = ({ payments }) => {
  // Format currency with comma separators and fixed 2 decimal places
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'XAF',
    }).format(amount);
  };

  return (
    <Card
      >
      <CardHeader 
        title="Recent Payment Requests" 
        subheader="All payment requests in the system"
        sx={{
          '& .MuiCardHeader-title': {
            fontSize: '1.125rem',
            fontWeight: 600,
          },
          '& .MuiCardHeader-subheader': {
            fontSize: '0.875rem',
          },
        }}
      />
      <CardContent>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Request ID</TableCell>
                <TableCell>Requester</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Beneficiary</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Submitted</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <TableRow key={payment.id} hover>
                    <TableCell>{payment.id}</TableCell>
                    <TableCell>{payment.requester}</TableCell>
                    <TableCell>{formatCurrency(payment.amount)}</TableCell>
                    <TableCell>{payment.beneficiary}</TableCell>
                    <TableCell>
                      <Chip
                        label={payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        size="small"
                        sx={{
                          bgcolor: statusColors[payment.status].bg,
                          color: statusColors[payment.status].color,
                          fontWeight: 600,
                          fontSize: '0.75rem',
                        }}
                      />
                    </TableCell>
                    <TableCell>{payment.submittedDate}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Box sx={{ py: 3, textAlign: 'center' }}>
                      <Typography variant="body1" color="text.secondary">
                        No payment requests found
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
  );
};

export default RecentPaymentRequests;