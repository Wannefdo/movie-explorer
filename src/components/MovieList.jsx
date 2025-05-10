import React, { useContext, useEffect, useState, useCallback } from 'react';
import { MovieContext } from '../context/MovieContext';
import MovieCard from './MovieCard';
import { Box, CircularProgress, Snackbar, Alert, Button } from '@mui/material';
import { searchMovies } from '../utils/api';

const usePrevious = (value) => {
  const ref = React.useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const MovieList = () => {
  const {
    movies, setMovies,
    searchQuery,
    page, setPage,
    totalPages, setTotalPages,
    selectedGenre,
    selectedYear,
    minRating,
  } = useContext(MovieContext);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const prevQuery = usePrevious(searchQuery);
  const prevGenre = usePrevious(selectedGenre);
  const prevYear = usePrevious(selectedYear);
  const prevRating = usePrevious(minRating);

  const fetchMovies = useCallback(async () => {
    if (!searchQuery && !selectedGenre && !selectedYear && !minRating) return;

    setLoading(true);
    try {
      const filters = {};
      if (selectedGenre) filters.with_genres = selectedGenre;
      if (selectedYear) filters.primary_release_year = selectedYear;
      if (minRating) filters['vote_average.gte'] = minRating;

      const res = await searchMovies(searchQuery, page, filters);
      const newMovies = res.data.results;
      const total = res.data.total_pages;

      setMovies(prev => page === 1 ? newMovies : [...prev, ...newMovies]);
      setTotalPages(total);
    } catch (error) {
      console.error(error);
      setErrorMsg('Failed to fetch movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, page, selectedGenre, selectedYear, minRating, setMovies, setTotalPages]);

  useEffect(() => {
    if (
      searchQuery !== prevQuery ||
      selectedGenre !== prevGenre ||
      selectedYear !== prevYear ||
      minRating !== prevRating
    ) {
      setMovies([]);
      setPage(1);
      setTotalPages(1);
    }
  }, [searchQuery, selectedGenre, selectedYear, minRating, prevQuery, prevGenre, prevYear, prevRating, setMovies, setPage, setTotalPages]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Box>

      {loading && (
        <Box sx={{ mt: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && page < totalPages && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleLoadMore}
          sx={{ mt: 4 }}
        >
          Load More
        </Button>
      )}

      <Snackbar
        open={!!errorMsg}
        autoHideDuration={4000}
        onClose={() => setErrorMsg('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setErrorMsg('')}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MovieList;
