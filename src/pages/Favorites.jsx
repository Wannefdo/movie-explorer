// Favorites.jsx
import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import { Box, Typography } from '@mui/material';

const Favorites = () => {
  const { favorites, user } = useContext(MovieContext);

  if (!user) return <Typography>Please log in to view your favorites.</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Your Favorites</Typography>

      {favorites.length === 0 ? (
        <Typography>No favorites yet.</Typography>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
          }}
        >
          {favorites.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Favorites;
