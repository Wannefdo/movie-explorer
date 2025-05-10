import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout';
import Header from './components/Header';
import Footer from './components/Footer';
import MovieProvider from './context/MovieContext';

import { CssBaseline, Container, createTheme, ThemeProvider } from '@mui/material';

const AppContent = ({ darkMode, handleThemeChange }) => {
  const location = useLocation();

  const hideHeader = ['/login', '/signup'].includes(location.pathname);
  const hideFooter = ['/login', '/signup', '/favorites', '/details'].includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />}

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Container>

      {!hideFooter && <Footer />}
    </>
  );
};


const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleThemeChange = () => setDarkMode((prev) => !prev);

  return (
    <MovieProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppContent darkMode={darkMode} handleThemeChange={handleThemeChange} />
        </Router>
      </ThemeProvider>
    </MovieProvider>
  );
};

export default App;
