import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  alpha
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Credentials required.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const response = await api.post("/users/login", formData);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials.");
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
      background: 'radial-gradient(circle at top right, #1e293b, #0f172a)',
      p: 2
    }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Paper variant="glass" sx={{ p: { xs: 4, md: 8 }, maxWidth: 500, width: '100%', textAlign: 'center' }}>
          <IconButton onClick={() => navigate('/home')} sx={{ position: 'absolute', top: 20, left: 20, color: 'white' }}>
            <ArrowBackIcon />
          </IconButton>

          <Box sx={{ mb: 4 }}>
            <Box sx={{ width: 48, height: 48, bgcolor: 'secondary.main', borderRadius: 1.5, mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LockIcon sx={{ color: 'white' }} />
            </Box>
            <Typography variant="h4" fontWeight="900" color="white" gutterBottom>Command Access</Typography>
            <Typography variant="body1" sx={{ color: alpha('#fff', 0.6) }}>Sign in to the Capital Trading Payment System</Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              InputProps={{
                startAdornment: <EmailIcon sx={{ mr: 1, color: 'secondary.main' }} />,
              }}
              sx={{ '& .MuiInputBase-input': { color: 'white' }, '& .MuiInputLabel-root': { color: alpha('#fff', 0.5) } }}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              InputProps={{
                startAdornment: <LockIcon sx={{ mr: 1, color: 'secondary.main' }} />,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: alpha('#fff', 0.5) }}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiInputBase-input': { color: 'white' }, '& .MuiInputLabel-root': { color: alpha('#fff', 0.5) } }}
            />

            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={loading}
              sx={{ mt: 4, height: 56, borderRadius: '50px', fontSize: '1.1rem', fontWeight: 'bold' }}
            >
              {loading ? "Authenticating..." : "Authorize Access"}
            </Button>

            <Typography sx={{ mt: 4, color: alpha('#fff', 0.5) }}>
              New to the system? <Link to="/register" style={{ color: '#3b82f6', fontWeight: 'bold', textDecoration: 'none' }}>Initialize Account</Link>
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}