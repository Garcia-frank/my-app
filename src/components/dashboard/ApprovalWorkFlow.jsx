import { Box, Typography, Paper, Grid } from '@mui/material';
import FileTextIcon from '@mui/icons-material/Description';
import VerifiedIcon from '@mui/icons-material/VerifiedUser';
import SecurityIcon from '@mui/icons-material/Security';
import PaymentIcon from '@mui/icons-material/Payment';
import ArchiveIcon from '@mui/icons-material/Archive';

const workflowSteps = [
  {
    icon: <FileTextIcon />,
    title: 'Request Creation',
    subtitle: 'Department Heads',
    color: '#1976d2'
  },
  {
    icon: <VerifiedIcon />,
    title: 'Verification',
    subtitle: 'Financial Analysts',
    color: '#2196f3'
  },
  {
    icon: <SecurityIcon />,
    title: 'Approval',
    subtitle: 'Finance Manager',
    color: '#4caf50'
  },
  {
    icon: <PaymentIcon />,
    title: 'Payment',
    subtitle: 'Accounting',
    color: '#ff9800'
  },
  {
    icon: <ArchiveIcon />,
    title: 'Archiving',
    subtitle: 'System',
    color: '#9e9e9e'
  }
];

const ApprovalWorkflow = () => {
  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Approval Workflow Overview
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Current approval paths and their status
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {workflowSteps.map((step, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                p: 2,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: `${step.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 1,
                  '& svg': {
                    color: step.color,
                    fontSize: 24,
                  },
                }}
              >
                {step.icon}
              </Box>
              <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                {step.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {step.subtitle}
              </Typography>

              {index < workflowSteps.length - 1 && (
                <Box
                  sx={{
                    position: 'absolute',
                    right: { xs: '50%', sm: 0 },
                    top: { xs: 'auto', sm: '50%' },
                    bottom: { xs: 0, sm: 'auto' },
                    transform: {
                      xs: 'translateX(50%) translateY(50%)',
                      sm: 'translateY(-50%)',
                    },
                    width: { xs: 2, sm: 24 },
                    height: { xs: 24, sm: 2 },
                    bgcolor: 'divider',
                  }}
                />
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ApprovalWorkflow;