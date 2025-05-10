import React, { useEffect, useContext } from 'react';
import { fetchTrendingMovies } from '../utils/api';
import { MovieContext } from '../context/MovieContext';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { Box, Typography, Container, useTheme } from '@mui/material';
import LastClickedMovieCard from '../components/LastClickedMovieCard';




const Home = () => {
  const { setMovies, isLoggedIn } = useContext(MovieContext);

  const theme = useTheme();

  useEffect(() => {
    const loadTrending = async () => {
      const res = await fetchTrendingMovies();
      setMovies(res.data.results);
    };
    loadTrending();
  }, [setMovies]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1e1e2f, #2a2a40)'
          : 'linear-gradient(135deg, #e3f2fd, #fff)',
        py: 5,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        {/* Search Bar Section */}
        <SearchBar />

        {isLoggedIn && (
  <Box sx={{ width: '100%', mt: 2 }}>
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
      🎬 Last Viewed Movie
    </Typography>
    <LastClickedMovieCard />
  </Box>
)}



        {/* Section Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
            borderBottom: `3px solid ${theme.palette.primary.main}`,
            paddingBottom: '6px',
            letterSpacing: '0.5px',
            textAlign: 'center',
            mt: 2,
          }}
        >
          🎥 Trending Movies
        </Typography>

        {/* Movie List Section */}
        <Box
          sx={{
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            borderRadius: 3,
            boxShadow: theme.shadows[3],
            padding: 3,
          }}
        >
          <MovieList />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
