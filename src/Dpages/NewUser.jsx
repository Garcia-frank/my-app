import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Paper
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const roles = ['Employee', 'Manager', 'Admin'];
const statuses = ['active', 'inactive'];

const NewUser = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    role: 'Employee',
    status: 'active',
    lastLogin: new Date().toISOString()
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      ...user,
      id: uuidv4(),
      lastLogin: new Date().toISOString()
    };

    console.log('User to be created:', newUser);
    
    // TODO: Send to backend via Axios
    // Example:
    // axios.post('/api/users', newUser)
    //   .then(() => navigate('/user-management'))
    //   .catch(error => console.error(error));

    navigate('/user-management');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Add New User
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            select
            label="Role"
            name="role"
            value={user.role}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Status"
            name="status"
            value={user.status}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </MenuItem>
            ))}
          </TextField>
          <Box mt={3} display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save User
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default NewUser;  // Fixed export to match component name