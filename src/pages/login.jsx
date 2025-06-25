import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    if (!username || !email || !password) {
      setError("Please kindly fill all the Fields.");
    } else {
      setError("");
      navigate("/dashboard"); // Redirection
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", padding: 1, overflow:"hidden"}}>
      <Container maxWidth="lg">
        <Paper
          elevation={4}
          sx={{
            display: "flex",
            bgcolor: "f5f5f5",
            flexDirection: { xs: "column", md: "row" },
            overflow: "hidden",
            borderRadius: 7,
            minHeight: { xs: "auto", md: "80vh" },
          }}
        >
          {/* Partie gauche */}
          <Box
            sx={{
              flex: 0.8,
              bgcolor: "primary.main",
              color: "white",
              p: 10,
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "center",
              gap: 2,
              "& h3": {
                fontSize: "2rem",
                lineHeight: 1,
              },
            }}
          >
            <Typography variant="h3" fontWeight="bold" lineHeight={1.2}>
              Capital Trading <br />
              Payment Request <br />
              System
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Streamline your payment approval process with our secure, role-based workflow system.
            </Typography>
            <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography variant="subtitle1">🛡️ Secure Role-Based Access</Typography>
                <Typography variant="body2">Manage permissions based on roles</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1">🔁 Multi-Step Approvals</Typography>
                <Typography variant="body2">Compliance with approval workflows</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1">📊 Comprehensive Tracking</Typography>
                <Typography variant="body2">Track every step of the process</Typography>
              </Box>
            </Box>
          </Box>

          {/* Partie droite */}
          <Box
            sx={{
              flex: 1,
              bgcolor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 4,
              overflowY: "auto",
              height: "100%",
            }}
          >
            <Container maxWidth="sm">
              <Paper
                elevation={3}
                sx={{
                  padding: 7,
                  borderRadius: 15,
                  transition: "0.3s",
                  ":hover": { boxShadow: 6 },
                }}
              >
                <Box textAlign="center" mb={2}>
                  <Typography variant="h5" fontWeight="bold">
                    Welcome
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Sign in to your account or{" "}
                    <span
                      style={{ color: "#1976d2", cursor: "pointer" }}
                      onClick={() => navigate("/register")}
                    >
                      create a new one
                    </span>
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="User-name"
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    InputProps={{
                      startAdornment: <PersonIcon sx={{ marginRight: 1 }} />,
                    }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    InputProps={{
                      startAdornment: <EmailIcon sx={{ marginRight: 1 }} />,
                    }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    InputProps={{
                      startAdornment: <LockIcon sx={{ marginRight: 1 }} />,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                            hover="none"
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {error && (
                    <Typography color="error" variant="body2">
                      {error}
                    </Typography>
                  )}
                  <Button type="submit" fullWidth variant="contained" sx={{ marginTop: 2 }}>
                    Login
                  </Button>
                  <Typography align="center" sx={{ marginTop: 2 }}>
                    Don't have an Account ?{" "}
                    <Link to="/register" style={{ color: "#1976d2" }}>
                      Sign IN
                    </Link>
                  </Typography>
                  <Typography align="center" sx={{ marginTop: 2 }}>
                    <Link to="/home" style={{ color: "#1976d2" }}>
                      Password Forgetten ?
                    </Link>
                  </Typography>
                </Box>
              </Paper>
            </Container>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}