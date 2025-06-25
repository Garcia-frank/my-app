import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ onMenuToggle }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <AppBar position="fixed" sx={{ width: "100%", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Capital Trading Company
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="body2"
            sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
          >
            Admin User
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
