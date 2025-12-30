import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  Divider,
  useMediaQuery,
  useTheme,
  Drawer,
  Link,
  Paper
} from '@mui/material';
import {
  Security as SecurityIcon,
  SyncAlt as SyncAltIcon,
  ShowChart as ShowChartIcon,
  CheckCircle as CheckCircleIcon,
  Menu as MenuIcon,
  ArrowForward as ArrowForwardIcon,
  Bolt as BoltIcon,
  AutoGraph as AutoGraphIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileOpen(false);
    }
  };

  const navItems = [
    { text: 'Features', section: 'features' },
    { text: 'Benefits', section: 'benefits' },
    { text: 'Departments', section: 'departments' },
    { text: 'Login', href: '/login' },
    { text: "Register", href: '/register', isButton: true }
  ];

  const features = [
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Secure Role Access',
      description: 'Precisely control permissions based on department-specific roles (Requester, Verifier, Approver).'
    },
    {
      icon: <SyncAltIcon sx={{ fontSize: 40 }} />,
      title: 'Multi-level Approval',
      description: 'Automated 3-step validation workflow ensuring accounting compliance and transparency.'
    },
    {
      icon: <ShowChartIcon sx={{ fontSize: 40 }} />,
      title: 'Real-time Analytics',
      description: 'Track spending patterns and request lifecycles with a detailed audit trail.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Navigation */}
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 80, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 40, height: 40, bgcolor: 'primary.main', borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6" color="white" fontWeight="bold">C</Typography>
              </Box>
              <Typography variant="h5" fontWeight="bold" sx={{ color: 'primary.main', display: { xs: 'none', sm: 'block' } }}>
                Capital Trading
              </Typography>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, alignItems: 'center' }}>
              {navItems.map((item) => (
                item.isButton ? (
                  <Button
                    key={item.text}
                    variant="contained"
                    color="secondary"
                    href={item.href}
                    endIcon={<ArrowForwardIcon />}
                    sx={{ borderRadius: '50px', px: 4 }}
                  >
                    {item.text}
                  </Button>
                ) : (
                  <Link
                    key={item.text}
                    href={item.href || `#${item.section}`}
                    onClick={item.section ? (e) => { e.preventDefault(); scrollToSection(item.section); } : null}
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 600,
                      textDecoration: 'none',
                      '&:hover': { color: 'secondary.main' },
                      transition: 'color 0.2s'
                    }}
                  >
                    {item.text}
                  </Link>
                )
              ))}
            </Box>

            <IconButton onClick={handleDrawerToggle} sx={{ display: { md: 'none' } }}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{
        pt: { xs: 8, md: 15 },
        pb: { xs: 10, md: 20 },
        background: 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.08), transparent), radial-gradient(circle at bottom left, rgba(139, 92, 246, 0.08), transparent)'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <Typography variant="h1" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '4.5rem' }, lineHeight: 1.1 }}>
                  The Intelligent Way to <Typography component="span" variant="h1" color="secondary.main" sx={{ fontSize: 'inherit' }}>Manage Payments</Typography>
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ mb: 5, lineHeight: 1.6, maxWidth: 600 }}>
                  Empower your departments with a secure, automated, and hyper-efficient payment request ecosystem designed for mid-to-large enterprises.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <Button variant="contained" color="secondary" size="large" href="/register" sx={{ height: 64, px: 6, fontSize: '1.1rem', borderRadius: '50px' }}>
                    Get Started Free
                  </Button>
                  <Button variant="outlined" size="large" onClick={() => scrollToSection('features')} sx={{ height: 64, px: 6, fontSize: '1.1rem', borderRadius: '50px' }}>
                    See How It Works
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={5}>
              <motion.div initial={{ opacity: 0, scale: 0.8, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1 }}>
                <Paper variant="glass" sx={{ p: 5, position: 'relative', overflow: 'hidden' }}>
                  <Box sx={{ position: 'absolute', top: -20, right: -20, width: 140, height: 140, bgcolor: 'secondary.light', opacity: 0.1, borderRadius: '50%' }} />
                  <AutoGraphIcon sx={{ fontSize: 70, color: 'secondary.main', mb: 3 }} />
                  <Typography variant="h4" fontWeight="900" gutterBottom>Capital Trading</Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4, opacity: 0.8 }}>
                    Internal payment request protocol v4.0. Enterprise encryption active.
                  </Typography>
                  <Divider sx={{ my: 3 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="caption" display="block" color="text.secondary" fontWeight="bold">SYSTEM STATUS</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 8, height: 8, bgcolor: 'success.main', borderRadius: '50%' }} />
                        <Typography variant="body2" fontWeight="bold" color="success.main">Operational</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" display="block" color="text.secondary" fontWeight="bold">ACTIVE NODES</Typography>
                      <Typography variant="body2" fontWeight="bold">1,204</Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container id="features" sx={{ py: 15 }}>
        <Box sx={{ textAlign: 'center', mb: 12 }}>
          <Typography variant="overline" color="secondary" fontWeight="bold" letterSpacing={2}>CORE CAPABILITIES</Typography>
          <Typography variant="h2" gutterBottom>Built for Enterprise Performance</Typography>
          <Typography variant="h5" color="text.secondary" maxWidth={700} mx="auto">Every tool you need to eliminate financial bottlenecks and accelerate growth.</Typography>
        </Box>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div variants={itemVariants}>
                  <Card sx={{ height: '100%', p: 3, border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <CardContent>
                      <Box sx={{ display: 'inline-flex', p: 2, borderRadius: 2.5, bgcolor: 'rgba(59, 130, 246, 0.1)', color: 'secondary.main', mb: 4 }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h4" gutterBottom fontWeight="700">{feature.title}</Typography>
                      <Typography variant="body1" color="text.secondary" lineHeight={1.6}>{feature.description}</Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Benefits Section */}
      <Box id="benefits" sx={{ bgcolor: 'primary.main', py: 15, color: 'white', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: -50, right: -50, width: 300, height: 300, bgcolor: 'secondary.main', opacity: 0.03, borderRadius: '50%' }} />
        <Container maxWidth="lg">
          <Grid container spacing={10} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <Typography variant="h2" color="white" gutterBottom sx={{ fontSize: { xs: '2rem', md: '3.5rem' } }}>Unmatched Business Efficiency</Typography>
                <Typography variant="h5" sx={{ mb: 6, opacity: 0.8, lineHeight: 1.6 }}>Watch your productivity soar with our streamlined, battle-tested workflows.</Typography>
                <List sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {[
                    { title: '75% Faster Processing', desc: 'Automated request routing slashes manual approval cycles.' },
                    { title: '100% Audit Readiness', desc: 'Immutable, cloud-synced history for every transaction.' },
                    { title: 'Smart Error Detection', desc: 'Real-time validation stops mistakes before they hit accounting.' }
                  ].map((item, i) => (
                    <ListItem key={i} sx={{ display: 'flex', gap: 3, p: 0, alignItems: 'flex-start' }}>
                      <CheckCircleIcon sx={{ color: 'secondary.light', fontSize: 32, mt: 0.5 }} />
                      <Box>
                        <Typography variant="h5" color="white" fontWeight="700">{item.title}</Typography>
                        <Typography variant="body1" sx={{ opacity: 0.7 }}>{item.desc}</Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                <Paper variant="glass" sx={{ bgcolor: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, p: 8, textAlign: 'center' }}>
                  <Typography variant="h1" align="center" color="secondary.light" sx={{ mb: 4, fontSize: '5rem' }}>🚀</Typography>
                  <Typography variant="h3" align="center" color="white" fontWeight="900">Next-Gen Ready</Typography>
                  <Typography variant="body1" align="center" sx={{ color: 'rgba(255,255,255,0.6)', mt: 2 }}>Ready for deployment across 50+ global locations.</Typography>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container sx={{ py: 15 }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Paper
            sx={{
              p: { xs: 8, md: 12 },
              textAlign: 'center',
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              color: 'white',
              borderRadius: 10,
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
            }}
          >
            <Typography variant="h2" color="white" gutterBottom fontWeight="900" sx={{ mb: 3 }}>Scale Your Operations Today</Typography>
            <Typography variant="h5" sx={{ mb: 8, opacity: 0.8, maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}>
              Join Capital Trading's leading-edge payment ecosystem and take absolute control of your enterprise's financial future.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button variant="contained" color="secondary" size="large" href="/register" sx={{ height: 72, px: 10, fontSize: '1.25rem', borderRadius: '50px' }}>
                Create Your Account
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: 'white', py: 10, borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 40, height: 40, bgcolor: 'primary.main', borderRadius: 1.5 }} />
              <Typography variant="h5" fontWeight="900" color="primary">Capital Trading</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 5 }}>
              <Link href="#" color="text.secondary" underline="none" fontWeight="600" sx={{ '&:hover': { color: 'primary.main' } }}>Privacy</Link>
              <Link href="#" color="text.secondary" underline="none" fontWeight="600" sx={{ '&:hover': { color: 'primary.main' } }}>Terms</Link>
              <Link href="#" color="text.secondary" underline="none" fontWeight="600" sx={{ '&:hover': { color: 'primary.main' } }}>Security</Link>
            </Box>
            <Typography variant="body1" color="text.secondary" fontWeight="500">
              © 2025 Capital Trading Co. Global Financial Solutions.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Navigation Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle} PaperProps={{ sx: { width: 300, p: 4, borderRadius: '20px 0 0 20px' } }}>
        <Box>
          <Typography variant="h4" fontWeight="900" sx={{ mb: 6 }}>Menu</Typography>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ mb: 3 }}>
                <Button
                  fullWidth
                  variant={item.isButton ? "contained" : "text"}
                  color={item.isButton ? "secondary" : "primary"}
                  href={item.href || `#${item.section}`}
                  onClick={item.section ? (e) => { e.preventDefault(); scrollToSection(item.section); } : null}
                  sx={{
                    justifyContent: 'flex-start',
                    py: 2,
                    px: 3,
                    borderRadius: item.isButton ? '50px' : 2,
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                >
                  {item.text}
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default HomePage;