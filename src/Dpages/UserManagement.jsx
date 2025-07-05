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
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ← ajout ici
import PageHeader from '../components/ui/PageHeader';
import { users } from '../mockData';

const UserManagement = () => {
  const navigate = useNavigate(); // ← initialisation ici

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [userToDeactivate, setUserToDeactivate] = useState(null);

  const handleAddUser = () => {
    navigate('/new-user'); // ← redirection vers la nouvelle page
  };

  const handleEditUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    setSelectedUser(user);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    console.log('Saving edited user:', selectedUser);
    setOpenEditDialog(false);
  };

  const handleDeactivateUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    setUserToDeactivate(user);
    setOpenConfirmDialog(true);
  };

  const confirmDeactivate = () => {
    console.log('Deactivating user:', userToDeactivate.id);
    setOpenConfirmDialog(false);
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

      {/* Dialog pour Edit */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={selectedUser?.name || ''}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={selectedUser?.email || ''}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, email: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog pour confirmation de désactivation */}
      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogTitle>Confirm Deactivation</DialogTitle>
        <DialogContent>
          Are you sure you want to deactivate{' '}
          <strong>{userToDeactivate?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={confirmDeactivate}>
            Deactivate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserManagement;
