import React, { useEffect, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LastClickedMovieCard = () => {
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('lastClickedMovie');
    if (saved) {
      setMovie(JSON.parse(saved));
    }
  }, []);

  if (!movie) return null;

  return (
    <Box sx={{ mt: 4, width: '100%' }}>
      
      <Card
        sx={{
          display: 'flex',
          maxWidth: 600,
          borderRadius: 3,
          boxShadow: 3,
          overflow: 'hidden',
          cursor: 'pointer'
        }}
        onClick={() => navigate(`/movie/${movie.id}`)}
      >
        <CardMedia
          component="img"
          image={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
          alt={movie.title}
          sx={{ width: 150 }}
        />
        <CardContent>
          <Typography variant="h6">{movie.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.release_date}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            ⭐ {movie.vote_average}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LastClickedMovieCard;
