import { useState } from 'react';
import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      marginTop: '40px', // Adjust based on your header height
      maxWidth: '100vw',
      overflow: 'hidden'
    }}>
      <Header onMenuToggle={handleDrawerToggle} />
      <Sidebar 
        open={mobileOpen} 
        onClose={handleDrawerToggle} 
        drawerWidth={drawerWidth} 
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: '100vh',
          overflow: 'auto',
          bgcolor: 'background.default',
          marginLeft:'30px',
          padding: '20px',
          pt: 0,
        }}
      >
        <Toolbar /> {/* Ensures content starts below the app bar */}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;