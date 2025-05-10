import React, { useState, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Stack,
  Box,
  Switch,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Divider
} from '@mui/material';
import {
  Home,
  // Info,
  // ContactMail,
  Favorite,
  Person,
  Login,
  WbSunny,
  DarkMode,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';

const Header = ({ darkMode, handleThemeChange }) => {
  const { isLoggedIn, user } = useContext(MovieContext);

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { label: 'Home', icon: <Home />, path: '/' },
    // { label: 'About Us', icon: <Info />, path: '/about' },
    // { label: 'Contact Us', icon: <ContactMail />, path: '/contact' },
    { label: 'Favorites', icon: <Favorite />, path: '/favorites' },
    { label: 'Profile', icon: <Person />, path: '/profile' },
  ];

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <Typography variant="h6" color={isDark ? '#fff' : '#000'}>Menu</Typography>
        <IconButton onClick={toggleDrawer(false)} sx={{ color: isDark ? '#fff' : 'inherit' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => {
          if (item.label === 'Favorites' && !isLoggedIn) return null;
          if (item.label === 'Profile') return null;

          return (
            <ListItem button key={item.label} component={RouterLink} to={item.path}>
              <ListItemIcon sx={{ color: isDark ? '#fff' : 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ color: isDark ? '#fff' : '#000' }}
              />
            </ListItem>
          );
        })}

        {isLoggedIn && (
          <ListItem>
            <ListItemIcon sx={{ color: isDark ? '#fff' : 'inherit' }}>
              <Person />
            </ListItemIcon>
            <ListItemText
              primary={user?.username || 'Profile'}
              primaryTypographyProps={{ color: isDark ? '#fff' : '#000' }}
            />
          </ListItem>
        )}

        <ListItem
          button
          component={RouterLink}
          to={isLoggedIn ? '/logout' : '/login'}
        >
          <ListItemIcon sx={{ color: isDark ? '#fff' : 'inherit' }}>
            <Login />
          </ListItemIcon>
          <ListItemText
            primary={isLoggedIn ? 'Logout' : 'Login'}
            primaryTypographyProps={{ color: isDark ? '#fff' : '#000' }}
          />
        </ListItem>
      </List>

      <Divider />
      <Box display="flex" alignItems="center" justifyContent="center" py={2}>
        <WbSunny />
        <Switch
          checked={darkMode}
          onChange={handleThemeChange}
          color="default"
          inputProps={{ 'aria-label': 'theme toggle' }}
        />
        <DarkMode />
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: isDark ? '#1c1c1c' : '#1976d2',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: 'none',
            color: '#fff',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          🎬 Movie Explorer
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              edge="end"
              onClick={toggleDrawer(true)}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawer}
            </Drawer>
          </>
        ) : (
          <Stack direction="row" spacing={2} alignItems="center">
            {navItems.map((item) => {
              if (item.label === 'Favorites' && !isLoggedIn) return null;
              if (item.label === 'Profile') return null;

              return (
                <Button
                  key={item.label}
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    color: isDark ? '#fff' : '#000',
                    fontWeight: '500',
                    '&:hover': {
                      backgroundColor: isDark ? '#333' : '#e3f2fd',
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}

            {isLoggedIn && (
              <Stack direction="row" alignItems="center" spacing={1} sx={{ color: isDark ? '#fff' : '#000' }}>
                <Person />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {user?.username}
                </Typography>
              </Stack>
            )}

            <Button
              component={RouterLink}
              to={isLoggedIn ? '/logout' : '/login'}
              variant="outlined"
              color="inherit"
              startIcon={<Login />}
              sx={{
                borderColor: '#fff',
                color: '#fff',
                '&:hover': {
                  borderColor: '#ccc',
                  backgroundColor: isDark ? '#333' : '#1565c0',
                },
              }}
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </Button>

            <Box display="flex" alignItems="center" gap={0.5}>
              <WbSunny />
              <Switch
                checked={darkMode}
                onChange={handleThemeChange}
                color="default"
                inputProps={{ 'aria-label': 'theme toggle' }}
              />
              <DarkMode />
            </Box>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
