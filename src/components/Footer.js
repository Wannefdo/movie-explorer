import React from 'react';
import { Box, Typography, useTheme, Link, Stack } from '@mui/material';


const Footer = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 3,
        px: 2,
        textAlign: 'center',
        backgroundColor: isDark ? '#1e1e1e' : '#fafafa',
        color: isDark ? '#aaa' : '#333',
        borderTop: `1px solid ${isDark ? '#333' : '#ddd'}`,
      }}
    >
      <Stack direction="row" spacing={2} justifyContent="center" mb={1}>
        <Link href="/" color="inherit" underline="hover">
          Home
        </Link>
        <Link href="/favorites" color="inherit" underline="hover">
          Favorites
        </Link>
        <Link href="/login" color="inherit" underline="hover">
          Login
        </Link>
      </Stack>

      <Typography variant="body2" fontSize="0.85rem">
        © {new Date().getFullYear()} <strong>Movie Explorer</strong>. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
