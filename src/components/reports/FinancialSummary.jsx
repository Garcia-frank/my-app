import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Grid, 
  Typography, 
  Box,
  useTheme 
} from '@mui/material';

const FinancialSummary = ({ data }) => {
  const theme = useTheme();
  
  // Format currency with comma separators
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'XAF',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const summaryItems = [
    { 
      label: 'Total Approved', 
      value: formatCurrency(data.totalApproved),
      color: theme.palette.success.main
    },
    { 
      label: 'Pending Approval', 
      value: formatCurrency(data.pendingApproval),
      color: theme.palette.warning.main
    },
    { 
      label: 'Rejected', 
      value: formatCurrency(data.rejected),
      color: theme.palette.error.main
    },
    { 
      label: 'Total Processed', 
      value: formatCurrency(data.totalProcessed),
      color: theme.palette.primary.main
    },
  ];

  return (
    <Card>
      <CardHeader 
        title="Financial Summary" 
        sx={{
          '& .MuiCardHeader-title': {
            fontSize: '1.125rem',
            fontWeight: 600,
          },
        }}
      />
      <CardContent>
        <Grid container spacing={3}>
          {summaryItems.map((item, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="h4" 
                  component="div" 
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: '1.125rem',
                    color: item.color,
                    mb: 0.5
                  }}
                >
                  {item.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FinancialSummary;