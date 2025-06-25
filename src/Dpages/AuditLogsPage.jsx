import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Box, 
  Typography, 
  Select, 
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Stack,
  Divider,
  Paper
} from '@mui/material';
import PageHeader from '../components/ui/PageHeader';
import { auditLogs } from '../mockData';

const AuditLogs = () => {
  const [actionFilter, setActionFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  
  // Action type color mapping
  const actionTypeColors = {
    login: 'warning.main',
    payment_request: 'info.main',
    approval: 'success.main',
    user_management: 'secondary.main',
  };

  // Apply filters to logs
  const filteredLogs = auditLogs.filter(log => {
    if (actionFilter !== 'all' && log.actionType !== actionFilter) {
      return false;
    }
    if (dateFilter && !log.timestamp.includes(dateFilter)) {
      return false;
    }
    return true;
  });

  return (
    <React.Fragment>
      <PageHeader
        title="Audit Logs"
        subtitle="System activity and security logs"
      />
      
      <Card>
        <CardHeader 
          title="Recent Activity" 
          action={
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel id="action-filter-label">Filter Action</InputLabel>
                <Select
                  labelId="action-filter-label"
                  id="action-filter"
                  value={actionFilter}
                  label="Filter Action"
                  onChange={(e) => setActionFilter(e.target.value)}
                >
                  <MenuItem value="all">All Actions</MenuItem>
                  <MenuItem value="login">Login</MenuItem>
                  <MenuItem value="payment_request">Payment Request</MenuItem>
                  <MenuItem value="approval">Approval</MenuItem>
                  <MenuItem value="user_management">User Management</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Date"
                type="date"
                size="small"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ width: 200 }}
              />
            </Stack>
          }
          sx={{
            '& .MuiCardHeader-title': {
              fontSize: '1.125rem',
              fontWeight: 600,
            },
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            '& .MuiCardHeader-action': {
              margin: { xs: '8px 0 0 0', sm: 0 },
            },
          }}
        />
        <Divider />
        <CardContent>
          <Stack spacing={2}>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <Paper
                  key={log.id}
                  variant="outlined"
                  sx={{ 
                    p: 2, 
                    borderRadius: 1,
                    bgcolor: 'grey.50',
                    display: 'flex',
                    alignItems: 'flex-start'
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      bgcolor: actionTypeColors[log.actionType],
                      mt: 1,
                      mr: 2
                    }} 
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2">
                      <Box component="span" sx={{ fontWeight: 'bold' }}>
                        {log.user}
                      </Box>{' '}
                      {log.action}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {log.timestamp} | IP: {log.ipAddress}
                    </Typography>
                  </Box>
                </Paper>
              ))
            ) : (
              <Box sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  No audit logs match your filters
                </Typography>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default AuditLogs;