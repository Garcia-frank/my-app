import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  MenuItem,
  IconButton,
  Grid,
  alpha
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import BadgeIcon from "@mui/icons-material/Badge";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    sur_name: "",
    password: "",
    confirmPassword: "",
    department: "",
    role: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const rolesByDepartment = {
    IT: ["Requester", "Verifier", "Approver"],
    Finance: ["Requester", "Accountant", "Approver"],
    Production: ["Requester", "Verifier", "Approver"],
    RH: ["Requester", "Approver"],
    Commercial: ["Requester", "Verifier", "Approver"],
    Logistique: ["Requester", "Verifier", "Approver"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'department') {
      setFormData({ ...formData, [name]: value, role: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const response = await api.post("/users/register", formData);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at bottom left, #1e293b, #0f172a)',
      p: 2
    }}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
        <Paper variant="glass" sx={{ p: { xs: 4, md: 6 }, maxWidth: 800, width: '100%' }}>
          <IconButton onClick={() => navigate('/login')} sx={{ position: 'absolute', top: 20, left: 20, color: 'white' }}>
            <ArrowBackIcon />
          </IconButton>

          <Box textAlign="center" mb={4}>
            <Typography variant="h4" fontWeight="900" color="white" gutterBottom>Initialize Account</Typography>
            <Typography variant="body1" sx={{ color: alpha('#fff', 0.6) }}>Join the Capital Trading enterprise network</Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="First Name" name="name" value={formData.name} onChange={handleChange} InputProps={{ startAdornment: <PersonIcon sx={{ mr: 1, color: 'secondary.main' }} /> }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Last Name" name="sur_name" value={formData.sur_name} onChange={handleChange} InputProps={{ startAdornment: <PersonIcon sx={{ mr: 1, color: 'secondary.main' }} /> }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Enterprise Email" name="email" value={formData.email} onChange={handleChange} InputProps={{ startAdornment: <EmailIcon sx={{ mr: 1, color: 'secondary.main' }} /> }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} InputProps={{ startAdornment: <LockIcon sx={{ mr: 1, color: 'secondary.main' }} /> }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Confirm Password" name="confirmPassword" type={showPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} InputProps={{ startAdornment: <LockIcon sx={{ mr: 1, color: 'secondary.main' }} /> }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select fullWidth label="Department" name="department" value={formData.department} onChange={handleChange} InputProps={{ startAdornment: <BusinessIcon sx={{ mr: 1, color: 'secondary.main' }} /> }}>
                  {Object.keys(rolesByDepartment).map((dep) => <MenuItem key={dep} value={dep}>{dep}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select fullWidth label="Role" name="role" value={formData.role} onChange={handleChange} disabled={!formData.department} InputProps={{ startAdornment: <BadgeIcon sx={{ mr: 1, color: 'secondary.main' }} /> }}>
                  {(rolesByDepartment[formData.department] || []).map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                </TextField>
              </Grid>
            </Grid>

            {error && <Typography color="error" align="center" sx={{ mt: 3 }}>{error}</Typography>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={loading}
              sx={{ mt: 6, height: 60, borderRadius: '50px', fontSize: '1.2rem', fontWeight: 'bold' }}
            >
              {loading ? "Creating Credentials..." : "Initialize Identity"}
            </Button>

            <Typography align="center" sx={{ mt: 4, color: alpha('#fff', 0.5) }}>
              Already registered? <Link to="/login" style={{ color: '#3b82f6', fontWeight: 'bold', textDecoration: 'none' }}>Login Access</Link>
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}