import { Link as RouterLink } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { TextField, Button, Paper, Typography, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import CloseIcon from '@mui/icons-material/Close';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showLogin] = useState(true);  // State to control visibility
  const { setUser } = useContext(MovieContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.username === username && user.password === password) {
      localStorage.setItem('loggedIn', 'true');
      setUser(user);
      setSuccessMessage('Login successful! Redirecting...');
      setTimeout(() => navigate('/'), 2000); // Redirect after a brief success message
    } else {
      setError('Invalid credentials');
    }
  };

  const handleClose = () => {
  navigate(-1); // Go back to the previous page
};


  if (!showLogin) return null; // Return nothing if login form is closed

  return (
    <Paper elevation={6} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 8, position: 'relative' }}>
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          color: 'gray',
        }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h5" gutterBottom>Login</Typography>

      {successMessage && (
        <Typography color="success.main" sx={{ mb: 2 }}>
          {successMessage}
        </Typography>
      )}

      <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Username"
          fullWidth
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </Box>

      <Box textAlign="center" mt={2}>
        <Typography variant="body2">
          Don’t have an account?{' '}
          <RouterLink to="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Sign up here
          </RouterLink>
        </Typography>
      </Box>
    </Paper>
  );
};

export default Login;
