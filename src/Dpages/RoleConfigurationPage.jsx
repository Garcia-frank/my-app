import {
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  TextField
} from '@mui/material';
import PageHeader from '../components/ui/PageHeader';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { roles as initialRoles } from '../mockData';

const allPermissions = [
  'Full System Access',
  'User Management',
  'Financial Reports',
  'System Configuration',
  'Approve Payments',
  'View Reports',
  'Team Management',
  'Submit Requests',
  'View Own Requests'
];

const RoleConfiguration = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedRole, setEditedRole] = useState(null);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newRole, setNewRole] = useState({
    name: '',
    permissions: []
  });

  const handleEditPermissions = (roleId) => {
    const role = roles.find((r) => r.id === roleId);
    setEditedRole({ ...role });
    setOpenEditDialog(true);
  };

  const handleTogglePermission = ( isNew = false) => {
    const role = isNew ? newRole : editedRole;
    if (!role) return;
    const updatedPermissions = role.permissions.includes(perm)
      ? role.permissions.filter((p) => p !== perm)
      : [...role.permissions, perm];

    if (isNew) setNewRole({ ...newRole, permissions: updatedPermissions });
    else setEditedRole({ ...editedRole, permissions: updatedPermissions });
  };

  const handleSavePermissions = () => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === editedRole.id ? { ...r, permissions: editedRole.permissions } : r
      )
    );
    setOpenEditDialog(false);
  };

  const handleSaveNewRole = () => {
    const roleToAdd = {
      id: uuidv4(),
      name: newRole.name.trim(),
      permissions: newRole.permissions
    };
    setRoles((prev) => [...prev, roleToAdd]);
    setNewRole({ name: '', permissions: [] });
    setOpenAddDialog(false);
  };

  return (
    <>
      <PageHeader
        title="Role Configuration"
        subtitle="Configure user roles and permissions"
        buttonText="Add New Role"
        onButtonClick={() => setOpenAddDialog(true)}
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
                  {allPermissions.map((perm) => (
                    <ListItem key={perm} sx={{ py: 0.5, px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {role.permissions.includes(perm) ? (
                          <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" />
                        ) : (
                          <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
                        )}
                      </ListItemIcon>
                      <Typography variant="body2">{perm}</Typography>
                    </ListItem>
                  ))}
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

      {/* Dialog: Edit Permissions */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Permissions - {editedRole?.name}</DialogTitle>
        <DialogContent>
          {allPermissions.map((perm) => (
            <FormControlLabel
              key={perm}
              control={
                <Checkbox
                  checked={editedRole?.permissions.includes(perm)}
                  onChange={() => handleTogglePermission(perm)}
                />
              }
              label={perm}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSavePermissions} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog: Add New Role */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Role</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            fullWidth
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            margin="normal"
          />
          {allPermissions.map((perm) => (
            <FormControlLabel
              key={perm}
              control={
                <Checkbox
                  checked={newRole.permissions.includes(perm)}
                  onChange={() => handleTogglePermission(perm, true)}
                />
              }
              label={perm}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSaveNewRole}
            variant="contained"
            disabled={!newRole.name.trim()}
          >
            Save Role
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RoleConfiguration;
