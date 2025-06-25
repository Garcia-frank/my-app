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
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Drawer,
  CssBaseline,
  Paper,
  Link
} from '@mui/material';
import {
  Security as SecurityIcon,
  SyncAlt as SyncAltIcon,
  ShowChart as ShowChartIcon,
  CheckCircle as CheckCircleIcon,
  Menu as MenuIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      dark: '#0d47a1'
    },
    secondary: {
      main: '#ffffff'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  }
});

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
      icon: <SecurityIcon fontSize="large" color="primary" />,
      title: 'Role-based secure access',
      description: 'Precisely control who can create, verify and approve requests based on their department and role.'
    },
    {
      icon: <SyncAltIcon fontSize="large" color="primary" />,
      title: 'Multi-level approval workflow',
      description: 'Ensure compliance with a structured multi-step process for reliable validation.'
    },
    {
      icon: <ShowChartIcon fontSize="large" color="primary" />,
      title: 'Complete tracking',
      description: 'Track each step of the request process with a detailed history of actions and changes.'
    }
  ];

  const benefits = [
    {
      icon: <CheckCircleIcon color="success" />,
      title: 'Improved efficiency',
      description: 'Reduce payment request processing time by 75% through workflow automation.'
    },
    {
      icon: <CheckCircleIcon color="success" />,
      title: 'Total transparency',
      description: 'View the status of each request in real time and access a complete transaction history.'
    },
    {
      icon: <CheckCircleIcon color="success" />,
      title: 'Enhanced control',
      description: 'Ensure every request complies with the approval protocols established by your organization.'
    },
    {
      icon: <CheckCircleIcon color="success" />,
      title: 'Error reduction',
      description: 'Minimize human errors with a guided system that validates data at each step.'
    }
  ];

  const departments = [
    {
      name: 'IT',
      description: 'Management of requests for technological resources and IT services.',
      roles: 'Roles: Requester, Verifier, Approver'
    },
    {
      name: 'Finance',
      description: 'Invoice processing and expense tracking with accounting verification.',
      roles: 'Roles: Accountant, Verifier'
    },
    {
      name: 'Production',
      description: 'Management of supplies and production resources.',
      roles: 'Roles: Requester, Verifier'
    },
    {
      name: 'HR',
      description: 'Oversight of human resources expenses and training.',
      roles: 'Roles: Approver'
    },
    {
      name: 'Sales',
      description: 'Reimbursement requests for client expenses and events.',
      roles: 'Roles: Requester'
    },
    {
      name: 'Logistics',
      description: 'Management of transport costs, storage and supply chain.',
      roles: 'Roles: Requester, Verifier, Approver'
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        color: '#1f2937',
        overflowX: 'hidden'
      }}>
        {/* Navigation */}
        <AppBar position="static" sx={{ 
          backgroundColor: 'white', 
          color: 'inherit',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <Container maxWidth={false} sx={{ maxWidth: '100%', px: { xs: 2, md: 5 } }}>
            <Toolbar sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              px: 2,
              py: 1.5
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ 
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#1d4ed8'
                }}>
                  CTC
                </Typography>
                <Typography variant="h6" sx={{ 
                  fontSize: '1.25rem',
                  ml: 1
                }}>
                  Payment System
                </Typography>
              </Box>
              
              <Box sx={{ 
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 2
              }}>
                {navItems.map((item) => (
                  item.isButton ? (
                    <Button 
                      key={item.text}
                      variant="contained" 
                      color="primary" 
                      href={item.href}
                      sx={{ 
                        backgroundColor: '#2563eb',
                        color: 'white',
                        px: 3,
                        py: 1,
                        borderRadius: '0.5rem',
                        '&:hover': {
                          backgroundColor: '#1d4ed8'
                        },
                        transition: 'background-color 0.3s'
                      }}
                    >
                      {item.text}
                    </Button>
                  ) : (
                    <Link 
                      key={item.text}
                      href={item.href || `#${item.section}`}
                      onClick={item.section ? (e) => { e.preventDefault(); scrollToSection(item.section); } : null}
                      sx={{ 
                        px: 2,
                        py: 1,
                        color: 'inherit',
                        '&:hover': {
                          color: '#2563eb'
                        },
                        textDecoration: 'none'
                      }}
                    >
                      {item.text}
                    </Link>
                  )
                ))}
              </Box>
              
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ 
                  display: { xs: 'block', md: 'none' },
                  color: '#4b5563'
                }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
        
        {/* Mobile menu */}
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: 250,
              boxSizing: 'border-box'
            }
          }}
        >
          <Box sx={{ 
            px: 1,
            pt: 1,
            pb: 2,
            backgroundColor: 'white',
            borderTop: '1px solid #e5e7eb'
          }}>
            {navItems.map((item) => (
              <Link
                key={item.text}
                href={item.href || `#${item.section}`}
                onClick={item.section ? (e) => { e.preventDefault(); scrollToSection(item.section); } : null}
                sx={{
                  display: 'block',
                  px: 3,
                  py: 1.5,
                  borderRadius: '0.375rem',
                  '&:hover': {
                    backgroundColor: '#eff6ff'
                  },
                  ...(item.isButton && {
                    backgroundColor: '#2563eb',
                    color: 'white',
                    mt: 1,
                    '&:hover': {
                      backgroundColor: '#1d4ed8'
                    }
                  }),
                  textDecoration: 'none',
                  color: item.isButton ? 'white' : 'inherit',
                  transition: 'background-color 0.3s'
                }}
              >
                {item.text}
              </Link>
            ))}
          </Box>
        </Drawer>

        {/* Hero Section */}
        <Box component="section" sx={{ 
          background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
          color: 'white',
          py: { xs: 10, sm: 20 },
          
        }}>
          <Container maxWidth={false} sx={{ maxWidth: '100%', px: { xs: 2, md: 4 } }}>
            <Box sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center'
            }}>
              <Box sx={{ 
                width: { md: '50%' },
                mb: { xs: 5, md: 0 }
              }}>
                <Typography variant="h2" component="h1" sx={{ 
                  fontSize: { xs: '2.25rem', md: '3rem' },
                  fontWeight: 'bold',
                  lineHeight: '1.25',
                  mb: 3
                }}>
                  Simplify Your Payment Requests
                </Typography>
                <Typography variant="h5" sx={{ 
                  fontSize: '1.25rem',
                  mb: 4,
                  pr: { md: 5 }
                }}>
                  A complete system to manage, verify and approve payment requests with a secure role-based workflow.
                </Typography>
                <Box sx={{ 
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 3
                }}>
                  <Button 
                    variant="contained" 
                    href="/register"
                    sx={{ 
                      backgroundColor: 'white',
                      color: '#1d4ed8',
                      fontWeight: 'bold',
                      px: 6,
                      py: 2,
                      borderRadius: '0.5rem',
                      '&:hover': {
                        backgroundColor: '#f3f4f6'
                      },
                      transition: 'background-color 0.3s'
                    }}
                  >
                    Register Now
                  </Button>
                  <Button 
                    variant="outlined" 
                    href="/login"
                    sx={{ 
                      borderColor: 'white',
                      color: 'white',
                      px: 6,
                      py: 2,
                      borderRadius: '0.5rem',
                      '&:hover': {
                        backgroundColor: 'white',
                        color: '#1d4ed8'
                      },
                      transition: 'all 0.3s'
                    }}
                  >
                    Login
                  </Button>
                </Box>
              </Box>
              
              <Box sx={{ 
                width: { md: '50%' },
                display: 'flex',
                justifyContent: 'center'
              }}>
                <Paper sx={{ 
                  backgroundColor: 'white',
                  p: 4,
                  borderRadius: '0.5rem',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                  width: '100%',
                  maxWidth: '28rem'
                }}>
                  <Box sx={{ 
                    textAlign: 'center',
                    color: '#1f2937',
                    mb: 3
                  }}>
                    <Typography variant="h4" sx={{ 
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      mb: 0.5
                    }}>
                      Capital Trading
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: '#6b7280'
                    }}>
                      Payment Request System
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    backgroundColor: '#eff6ff',
                    p: 2,
                    borderRadius: '0.5rem',
                    mb: 3
                  }}>
                    <Typography variant="body1" align="center" sx={{ 
                      color: '#1e40af'
                    }}>
                      Access an efficient, secure and transparent payment system
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Main Content Sections */}
        <Box component="main" sx={{ 
          display: 'flex',
          flexDirection: 'column',
         
          overflowX: 'hidden'
        }}>
         

         {/* Features Section */}
<Box component="section" id="features" sx={{ 
  py: { xs: 8, md: 12 },
  backgroundColor: 'white',
  
}}>
  <Container maxWidth="lg">
    <Typography variant="h2" align="center" sx={{ 
      fontSize: '1.875rem',
      fontWeight: 'bold',
      mb: { xs: 6, md: 10 }
    }}>
      Fonctionnalités principales
    </Typography>
    <Grid container spacing={4} justifyContent="center">
      {features.map((feature, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Card sx={{ 
            height: '100%',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            p: 4,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
            },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <CardContent>
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'center',
                mb: 3,
                color: '#2563eb'
              }}>
                {feature.icon}
              </Box>
              <Typography variant="h3" sx={{ 
                fontSize: '1.25rem',
                fontWeight: 'bold',
                mb: 1.5
              }}>
                {feature.title}
              </Typography>
              <Typography variant="body1" sx={{ 
                color: '#6b7280'
              }}>
                {feature.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>
          {/* Benefits Section */}
          <Box component="section" id="benefits" sx={{ 
            py: { xs: 8, md: 12 },
            backgroundColor: '#f9fafb'
          }}>
            <Container maxWidth="lg">
              <Typography variant="h2" align="center" sx={{ 
                fontSize: '1.875rem',
                fontWeight: 'bold',
                mb: { xs: 4, md: 9 }
              }}>
                Why Choose Our System?
              </Typography>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={8}>
                  <List sx={{ 
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    p: 3,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}>
                    {benefits.map((benefit, index) => (
                      <React.Fragment key={index}>
                        <ListItem sx={{ py: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Box sx={{ 
                              flexShrink: 0,
                              mr: 2,
                              color: '#10b981'
                            }}>
                              {benefit.icon}
                            </Box>
                            <Box>
                              <Typography variant="h3" sx={{ 
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                                mb: 1
                              }}>
                                {benefit.title}
                              </Typography>
                              <Typography variant="body1" sx={{ 
                                color: '#6b7280'
                              }}>
                                {benefit.description}
                              </Typography>
                            </Box>
                          </Box>
                        </ListItem>
                        {index < benefits.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Departments Section */}
          <Box component="section" id="departments" sx={{ 
            py: { xs: 8, md: 10 },
            backgroundColor: 'white'
          }}>
            <Container maxWidth="lg">
              <Typography variant="h2" align="center" sx={{ 
                fontSize: '1.875rem',
                fontWeight: 'bold',
                mb: { xs: 6, md: 10 }
              }}>
                Suitable for All Departments
              </Typography>
              <Grid container spacing={5}>
                {departments.map((dept, index) => (
                  <Grid item xs={12} sm={2} lg={4} key={index}>
                    <Paper sx={{ 
                      backgroundColor: '#eff6ff',
                      p: 1,
                      borderRadius: '0.5rem',
                      borderLeft: '4px solid',
                      borderLeftColor: '#2563eb',
                      height: '100%'
                    }}>
                      <Typography variant="h3" sx={{ 
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        mb: 1.5
                      }}>
                        {dept.name}
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        color: '#374151',
                        mb: 2
                      }}>
                        {dept.description}
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: '#2563eb'
                      }}>
                        {dept.roles}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </Box>

        {/* CTA Section */}
        <Box component="section" sx={{ 
          background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
         
        }}>
          <Container maxWidth={false} sx={{ maxWidth: '100%', px: { xs: 2, md: 4 } }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" sx={{ 
                fontSize: '1.875rem',
                fontWeight: 'bold',
                mb: 3
              }}>
                Ready to optimize your payment request process?
              </Typography>
              <Typography variant="h5" sx={{ 
                fontSize: '1.25rem',
                mb: 5,
                maxWidth: '48rem',
                mx: 'auto'
              }}>
                Join the companies that have transformed their financial management with our intuitive solution.
              </Typography>
              <Box sx={{ 
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'center',
                gap: 3
              }}>
                <Button 
                  variant="contained" 
                  href="/register"
                  sx={{ 
                    backgroundColor: 'white',
                    color: '#1d4ed8',
                    fontWeight: 'bold',
                    px: 8,
                    py: 2.5,
                    borderRadius: '0.5rem',
                    '&:hover': {
                      backgroundColor: '#f3f4f6'
                    },
                    transition: 'background-color 0.3s'
                  }}
                >
                  Create Account
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => scrollToSection('features')}
                  sx={{ 
                    borderColor: 'white',
                    color: 'white',
                    px: 8,
                    py: 2.5,
                    borderRadius: '0.5rem',
                    '&:hover': {
                      backgroundColor: 'white',
                      color: '#1d4ed8'
                    },
                    transition: 'all 0.3s'
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Footer */}
        <Box component="footer" sx={{ 
          backgroundColor: '#1f2937',
          color: 'white',
          py: 8,
          
        }}>
          <Container maxWidth={false} sx={{ maxWidth: '100%', px: { xs: 2, md: 4 } }}>
            <Box sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              mb: 6
            }}>
              <Box sx={{ mb: { xs: 6, md: 0 } }}>
                <Typography variant="h3" sx={{ 
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  mb: 1
                }}>
                  CTC Payment System
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: '#9ca3af'
                }}>
                  Simplify Your Payment Requests
                </Typography>
              </Box>
              
              <Grid container spacing={4}>
                <Grid item xs={6} md={4}>
                  <Typography variant="h4" sx={{ 
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    mb: 2
                  }}>
                    Quick Links
                  </Typography>
                  <List dense>
                    <ListItem disablePadding>
                      <Link href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }} sx={{ 
                        color: '#9ca3af',
                        '&:hover': {
                          color: 'white'
                        },
                        textDecoration: 'none',
                        px: 1,
                        py: 0.5
                      }}>
                        Features
                      </Link>
                    </ListItem>
                    <ListItem disablePadding>
                      <Link href="#benefits" onClick={(e) => { e.preventDefault(); scrollToSection('benefits'); }} sx={{ 
                        color: '#9ca3af',
                        '&:hover': {
                          color: 'white'
                        },
                        textDecoration: 'none',
                        px: 1,
                        py: 0.5
                      }}>
                        Benefits
                      </Link>
                    </ListItem>
                    <ListItem disablePadding>
                      <Link href="#departments" onClick={(e) => { e.preventDefault(); scrollToSection('departments'); }} sx={{ 
                        color: '#9ca3af',
                        '&:hover': {
                          color: 'white'
                        },
                        textDecoration: 'none',
                        px: 1,
                        py: 0.5
                      }}>
                        Departments
                      </Link>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="h4" sx={{ 
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    mb: 2
                  }}>
                    Account
                  </Typography>
                  <List dense>
                    <ListItem disablePadding>
                      <Link href="/register" sx={{ 
                        color: '#9ca3af',
                        '&:hover': {
                          color: 'white'
                        },
                        textDecoration: 'none',
                        px: 1,
                        py: 0.5
                      }}>
                        Register
                      </Link>
                    </ListItem>
                    <ListItem disablePadding>
                      <Link href="/login" sx={{ 
                        color: '#9ca3af',
                        '&:hover': {
                          color: 'white'
                        },
                        textDecoration: 'none',
                        px: 1,
                        py: 0.5
                      }}>
                        Login
                      </Link>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h4" sx={{ 
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    mb: 2
                  }}>
                    Contact
                  </Typography>
                  <List dense>
                    <ListItem disablePadding>
                      <Typography variant="body1" sx={{ 
                        color: '#9ca3af',
                        px: 1,
                        py: 0.5
                      }}>
                        info@capitaltrading-cm.com
                      </Typography>
                    </ListItem>
                    <ListItem disablePadding>
                      <Typography variant="body1" sx={{ 
                        color: '#9ca3af',
                        px: 1,
                        py: 0.5
                      }}>
                        +237 691 149 100
                      </Typography>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Box>
            
            <Divider sx={{ 
              borderColor: 'rgba(255, 255, 255, 0.1)',
              my: 6
            }} />
            
            <Box sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography variant="body2" sx={{ 
                color: '#9ca3af',
                mb: { xs: 3, md: 0 }
              }}>
                &copy; 2025 Capital Trading Company. All rights reserved.
              </Typography>
              <Box sx={{ 
                display: 'flex',
                gap: 2
              }}>
                <IconButton href="#" sx={{ 
                  color: '#9ca3af',
                  '&:hover': {
                    color: 'white'
                  }
                }}>
                  <FacebookIcon />
                </IconButton>
                <IconButton href="#" sx={{ 
                  color: '#9ca3af',
                  '&:hover': {
                    color: 'white'
                  }
                }}>
                  <TwitterIcon />
                </IconButton>
                <IconButton href="#" sx={{ 
                  color: '#9ca3af',
                  '&:hover': {
                    color: 'white'
                  }
                }}>
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;