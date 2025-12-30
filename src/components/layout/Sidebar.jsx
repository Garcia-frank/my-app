import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Avatar,
  Stack
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardIcon from '@mui/icons-material/DashboardRounded';
import DescriptionIcon from '@mui/icons-material/DescriptionRounded';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmptyRounded';
import BarChartIcon from '@mui/icons-material/BarChartRounded';
import PeopleIcon from '@mui/icons-material/PeopleRounded';
import SettingsIcon from '@mui/icons-material/SettingsRounded';
import ListIcon from '@mui/icons-material/ListAltRounded';

const Sidebar = ({ open, onClose, drawerWidth }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'My Requests', icon: <DescriptionIcon />, path: '/my-requests' },
    { text: 'Pending Approvals', icon: <HourglassEmptyIcon />, path: '/pending-approvals' },
    { text: 'Finance Reports', icon: <BarChartIcon />, path: '/finance-reports' },
  ];

  const adminItems = [
    { text: 'User Management', icon: <PeopleIcon />, path: '/user-management' },
    { text: 'Role Configuration', icon: <SettingsIcon />, path: '/role-configuration' },
    { text: 'Audit Logs', icon: <ListIcon />, path: '/audit-logs' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const SidebarItem = ({ item, index }) => {
    const isSelected = location.pathname === item.path;

    return (
      <ListItem disablePadding sx={{ mb: 1 }}>
        <ListItemButton
          component={motion.div}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.05 }}
          selected={isSelected}
          onClick={() => handleNavigation(item.path)}
          sx={{
            borderRadius: '12px',
            mx: 1.5,
            transition: 'all 0.2s ease',
            color: isSelected ? 'primary.main' : 'text.secondary',
            backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
            '&:hover': {
              backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'rgba(0, 0, 0, 0.04)',
              transform: 'translateX(4px)',
            },
            '&.Mui-selected': {
              backgroundColor: 'rgba(99, 102, 241, 0.08)',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(99, 102, 241, 0.12)',
              },
              '& .MuiListItemIcon-root': {
                color: 'primary.main',
              },
            },
          }}
        >
          <ListItemIcon sx={{
            color: isSelected ? 'primary.main' : 'inherit',
            minWidth: 40
          }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.text}
            primaryTypographyProps={{
              fontWeight: isSelected ? 600 : 500,
              fontSize: '0.9rem'
            }}
          />
          {isSelected && (
            <Box
              component={motion.div}
              layoutId="activeIndicator"
              sx={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                ml: 1
              }}
            />
          )}
        </ListItemButton>
      </ListItem>
    );
  };

  const drawerContent = (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
    }}>
      <Toolbar sx={{ justifyContent: 'center', py: 2 }}>
        <Typography variant="h5" color="primary" fontWeight="bold" sx={{ letterSpacing: '1px' }}>
          NEXUS
        </Typography>
      </Toolbar>

      <Box sx={{ overflow: 'auto', flexGrow: 1, py: 2 }}>
        <List>
          {menuItems.map((item, index) => (
            <SidebarItem key={item.text} item={item} index={index} />
          ))}
        </List>
        <Divider sx={{ my: 2, mx: 3, borderColor: 'rgba(0,0,0,0.06)' }} />
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ px: 4, py: 1, display: 'block', fontWeight: 600, letterSpacing: '0.1em' }}
        >
          Administration
        </Typography>
        <List>
          {adminItems.map((item, index) => (
            <SidebarItem key={item.text} item={item} index={index + menuItems.length} />
          ))}
        </List>
      </Box>

      <Box p={2}>
        <Box sx={{
          p: 2,
          borderRadius: 4,
          bgcolor: 'primary.main',
          color: 'white',
          background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.25)'
        }}>
          <Stack direction="row" alignItems="center" spacing={2} component={motion.div} whileHover={{ scale: 1.02 }}>
            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 32, height: 32 }}>K</Avatar>
            <Box>
              <Typography variant="subtitle2" fontWeight="bold">Kamga</Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>Admin</Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              border: 'none',
              bgcolor: 'transparent'
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: '1px solid rgba(0,0,0,0.05)',
              bgcolor: 'transparent'
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};
export default Sidebar;