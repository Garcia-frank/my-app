import { 
  Card, 
  CardContent, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip, 
  Link, 
  Box 
} from '@mui/material';
import PageHeader from '../components/ui/PageHeader';
import { users } from '../mockData';

const UserManagement = () => {
  const handleAddUser = () => {
    // Handle add user action
    console.log('Add new user');
  };

  const handleEditUser = (userId) => {
    // Handle edit user action
    console.log('Edit user', userId);
  };

  const handleDeactivateUser = (userId) => {
    // Handle deactivate user action
    console.log('Deactivate user', userId);
  };

  return (
    <>
      <PageHeader
        title="User Management"
        subtitle="Manage system users and permissions"
        buttonText="Add New User"
        onButtonClick={handleAddUser}
      />
      
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        size="small"
                        color={user.status === 'active' ? 'success' : 'error'}
                        variant="filled"
                        sx={{ fontWeight: 600, fontSize: '0.75rem' }}
                      />
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <Box>
                        <Link
                          component="button"
                          underline="hover"
                          color="primary"
                          onClick={() => handleEditUser(user.id)}
                          sx={{ mr: 2, fontSize: '0.875rem' }}
                        >
                          Edit
                        </Link>
                        <Link
                          component="button"
                          underline="hover"
                          color="error"
                          onClick={() => handleDeactivateUser(user.id)}
                          sx={{ fontSize: '0.875rem' }}
                        >
                          {user.status === 'active' ? 'Deactivate' : 'Activate'}
                        </Link>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default UserManagement;