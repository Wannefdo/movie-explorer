import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../utils/api';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  useMediaQuery,
  Fade,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const loadDetails = async () => {
      const res = await getMovieDetails(id);
      setDetails(res.data);
      setLoaded(true);
    };
    loadDetails();
  }, [id]);

  if (!details) return null;

  const trailer = details.videos?.results.find(v => v.type === "Trailer");

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1300,
        p: 2,
      }}
    >
      <Fade in={loaded}>
        <Card
          sx={{
            width: isMobile ? '100%' : '80%',
            maxWidth: 800,
            borderRadius: 4,
            boxShadow: 10,
            position: 'relative',
            p: 2,
            backgroundColor: 'background.paper',
          }}
        >
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 10,
              color: 'text.secondary',
            }}
          >
            <CloseIcon />
          </IconButton>

          <CardContent>
            <Typography variant={isMobile ? 'h6' : 'h4'} fontWeight="bold" gutterBottom>
              {details.title}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: isMobile ? '0.85rem' : '1rem' }} gutterBottom>
              {details.overview}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 2 }}>
              {details.genres.map((genre) => (
                <Chip key={genre.id} label={genre.name} color="primary" />
              ))}
            </Box>

            {trailer && (
              <Box
                sx={{
                  position: 'relative',
                  paddingTop: '56.25%',
                  height: 0,
                  overflow: 'hidden',
                  borderRadius: 2,
                  mt: 2,
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="YouTube trailer"
                  frameBorder="0"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Box>
            )}
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default MovieDetails;
