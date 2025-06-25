import { Grid, Card, CardContent, Typography, Box, List, ListItem, ListItemIcon, Button } from '@mui/material';
import PageHeader from '../components/ui/PageHeader';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { roles } from '../mockData';

const RoleConfiguration = () => {
  const handleAddRole = () => {
    // Handle add role action
    console.log('Add new role');
  };

  const handleEditPermissions = (roleId) => {
    // Handle edit permissions action
    console.log('Edit permissions for role', roleId);
  };

  return (
    <>
      <PageHeader
        title="Role Configuration"
        subtitle="Configure user roles and permissions"
        buttonText="Add New Role"
        onButtonClick={handleAddRole}
      />
      
      <Grid container spacing={3}>
        {roles.map((role) => (
          <Grid item xs={12} md={6} lg={4} key={role.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {role.name}
                </Typography>
                <List sx={{ mt: 2 }}>
                  {role.permissions.map((permission, index) => (
                    <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" />
                      </ListItemIcon>
                      <Typography variant="body2">{permission}</Typography>
                    </ListItem>
                  ))}
                  {/* Example of a denied permission */}
                  {role.name === 'Employee' && (
                    <>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="body2">Approve Payments</Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="body2">View Reports</Typography>
                      </ListItem>
                    </>
                  )}
                  {role.name === 'Manager' && (
                    <ListItem sx={{ py: 0.5, px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
                      </ListItemIcon>
                      <Typography variant="body2">System Configuration</Typography>
                    </ListItem>
                  )}
                </List>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => handleEditPermissions(role.id)}
                  sx={{ mt: 2, fontSize: '0.875rem' }}
                >
                  Edit Permissions
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default RoleConfiguration;