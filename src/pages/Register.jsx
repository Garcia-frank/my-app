import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  MenuItem,
  IconButton,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import BadgeIcon from "@mui/icons-material/Badge";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const rolesByDepartment = {
    IT: ["Requester", "Verifier", "Approver"],
    Finance: ["Requester", "Accountant", "Approver"],
    Production: ["Requester", "Verifier", "Approver"],
    RH: ["Requester", "Approver"],
    Commercial: ["Requester", "Verifier", "Approver"],
    Logistique: ["Requester", "Verifier", "Approver"],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !username || !surname || !department || !role) {
      setError("All Fields are Required.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError("");
      navigate("/dashboard");
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
          {/* Left side (visible only on desktop) */}
          <Box
            sx={{
              flex: 3,
              bgcolor: "primary.main",
              color: "white",
              p: 10,
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "center",
              "& h3": {
                fontSize: "3rem",
                lineHeight: 1,
              },
            }}
          >
            <Typography variant="h3" fontWeight="bold" paddingBottom={5} lineHeight={1.2}>
              Capital Trading <br />
              Payment Request <br />
              System
            </Typography>
            <Typography variant="body1" mt={3}>
              Streamline your payment approval process with our secure, role-based
              workflow system.
            </Typography>
            <Box mt={3}>
              <Typography variant="subtitle1">🛡️ Secure Role-Based Access</Typography>
              <Typography variant="body2">Manage permissions based on roles</Typography>
              <Typography variant="subtitle1" mt={2}>
                🔁 Multi-Step Approvals
              </Typography>
              <Typography variant="body2">Compliance with approval workflows</Typography>
              <Typography variant="subtitle1" mt={2}>
                📊 Comprehensive Tracking
              </Typography>
              <Typography variant="body2">Track every step of the process</Typography>
            </Box>
          </Box>

          {/* Right side - form (always visible) */}
          <Box
            sx={{
              flex: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 4,
              bgcolor: "white",
              overflowY: "auto",
              height: "100%",
            }}
          >
            <Container maxWidth="sm">
              <Paper
                elevation={3}
                sx={{
                  padding: 3,
                  width: "100%",
                  borderRadius: 5,
                  transition: "0.3s",
                  ":hover": { boxShadow: 6 },
                }}
              >
                <Box sx={{ width: "100%", maxWidth: 500 }}>
                  <Typography variant="h5" fontWeight="bold" align="center">
                    REGISTER
                  </Typography>
                  <Typography variant="body2" align="center" mb={2}>
                    Login to have your new account !!
                  </Typography>

                  <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                      margin="normal"
                      fullWidth
                      label="User-name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      label="Sur-name"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              onMouseDown={(e) => e.preventDefault()}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      label="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle confirm password visibility"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              onMouseDown={(e) => e.preventDefault()}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ width: "200PX" }}>
                          <TextField
                            select
                            fullWidth
                            label="Département"
                            value={department}
                            onChange={(e) => {
                              const selectedDept = e.target.value;
                              setDepartment(selectedDept);
                              const availableRoles = rolesByDepartment[selectedDept] || [];
                              setRole(availableRoles.length === 1 ? availableRoles[0] : "");
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <BusinessIcon />
                                </InputAdornment>
                              ),
                            }}
                          >
                            {Object.keys(rolesByDepartment).map((dep) => (
                              <MenuItem key={dep} value={dep}>
                                {dep}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box sx={{ width: "200PX" }}>
                          <TextField
                            select
                            fullWidth
                            label="Rôle"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            disabled={!department}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <BadgeIcon />
                                </InputAdornment>
                              ),
                            }}
                          >
                            {(rolesByDepartment[department] || []).map((r) => (
                              <MenuItem key={r} value={r}>
                                {r}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Box>
                      </Grid>
                    </Grid>

                    {error && (
                      <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {error}
                      </Typography>
                    )}

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ marginTop: 4 }}
                    >
                      Sign in
                    </Button>

                    <Typography align="center" sx={{ marginTop: 2 }}>
                      Do you already have an account ?{" "}
                      <Link to="/login" style={{ color: "#1976d2" }}>
                        Login
                      </Link>
                    </Typography>

                    <Typography
                      align="center"
                      sx={{ marginTop: 2 }}
                      style={{ color: "#1976d2" }}
                    >
                      Welcome to CTC Payment Request System.
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Container>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}