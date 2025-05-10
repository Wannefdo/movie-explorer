import React, { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { MovieContext } from '../context/MovieContext';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { favorites, setFavorites, isLoggedIn } = useContext(MovieContext);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);


  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const toggleFavorite = (e) => {
  e.stopPropagation();
  if (!isLoggedIn) {
    setOpenSnackbar(true); // 👈 Open Snackbar
    return;
  }

  const updatedFavorites = isFavorite
    ? favorites.filter((fav) => fav.id !== movie.id)
    : [...favorites, movie];

  setFavorites(updatedFavorites);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};


  return (
    <Card
  onClick={() => {
    localStorage.setItem('lastClickedMovie', JSON.stringify(movie));
    navigate(`/movie/${movie.id}`);
  }}
  sx={{
    width: 200,
    margin: 2,
    cursor: 'pointer',
    borderRadius: 3,
    boxShadow: 3,
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: 6,
    },
    position: 'relative',
  }}
>

  <Snackbar
  open={openSnackbar}
  autoHideDuration={3000}
  onClose={() => setOpenSnackbar(false)}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
>
  <MuiAlert onClose={() => setOpenSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
    You must be logged in to add favorites.
  </MuiAlert>
</Snackbar>


      <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 3 }}>
        <CardMedia
          component="img"
          image={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
          alt={movie.title}
          sx={{
            transition: 'transform 0.5s',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        />
        <IconButton
          onClick={toggleFavorite}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 10,
            color: isFavorite ? 'error.main' : 'white',
            backgroundColor: 'rgba(0,0,0,0.6)',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' },
          }}
        >
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.3)',
            opacity: 0,
            transition: 'opacity 0.3s',
            borderRadius: 3,
            '&:hover': {
              opacity: 1,
            },
          }}
        />
      </Box>

      <CardContent sx={{ padding: 1.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          {movie.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {movie.release_date?.split('-')[0]}
        </Typography>
        <Typography variant="body2" sx={{ color: 'yellow.main', display: 'flex', alignItems: 'center' }}>
          <span role="img" aria-label="star">⭐</span> {movie.vote_average}
        </Typography>
      </CardContent>
    </Card>

    
  );
};

export default MovieCard;
