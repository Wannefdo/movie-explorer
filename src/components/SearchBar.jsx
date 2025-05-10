import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Button,
  Box,
  CircularProgress,
  Typography
} from '@mui/material';
import { MovieContext } from '../context/MovieContext';
import { searchMovies } from '../utils/api';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';


const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 27, name: 'Horror' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' },
];

const years = Array.from({ length: 100 }, (_, i) => 2025 - i);

const SearchBar = () => {
  const {
    setMovies,
    searchQuery, setSearchQuery,
    selectedGenre, setSelectedGenre,
    selectedYear, setSelectedYear,
    minRating, setMinRating
  } = useContext(MovieContext);

  const [loading, setLoading] = useState(false);
  const debounceTimer = useRef(null);

  const handleSearch = useCallback(async () => {
    const filters = {};
    if (selectedGenre) filters.with_genres = selectedGenre;
    if (selectedYear) filters.primary_release_year = selectedYear;
    if (minRating) filters['vote_average.gte'] = minRating;

    try {
      setLoading(true);
      const res = await searchMovies(searchQuery, 1, filters);
      setMovies(res.data.results);
      localStorage.setItem("lastSearchResult", JSON.stringify(res.data.results[0] || {}));

    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedGenre, selectedYear, minRating, setMovies]);

  useEffect(() => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => clearTimeout(debounceTimer.current);
  }, [handleSearch]);

  const handleClearFilters = () => {
    setSelectedGenre('');
    setSelectedYear('');
    setMinRating(0);
    setSearchQuery('');
    setMovies([]);
  };

  return (
  <Box
    sx={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: 'background.paper',
      boxShadow: 3,
      px: { xs: 2, md: 6 },
      py: 3,
    }}
  >
    {loading && (
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <CircularProgress size={24} />
      </Box>
    )}

    {/* Search Bar */}
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Search movies..."
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
      />
    </Box>

    {/* Accordion for Filters */}
    <Accordion>
      <AccordionSummary expandIcon={<span>&#9660;</span>}>
        <Typography variant="subtitle1">Filters</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr',
              lg: 'repeat(4, 1fr)'
            },
            gap: 2
          }}
        >
          {/* Genre */}
          <FormControl fullWidth>
            <InputLabel>Genre</InputLabel>
            <Select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              label="Genre"
            >
              <MenuItem value="">All Genres</MenuItem>
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Year */}
          <FormControl fullWidth>
            <InputLabel>Year</InputLabel>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              label="Year"
            >
              <MenuItem value="">All Years</MenuItem>
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Rating Slider */}
          <Box>
            <Typography sx={{ fontSize: 14 }}>Min Rating: {minRating}</Typography>
            <Slider
              value={minRating}
              onChange={(e, val) => setMinRating(val)}
              valueLabelDisplay="auto"
              step={0.5}
              min={0}
              max={10}
              marks
              sx={{ mt: 1 }}
            />
          </Box>

          {/* Clear Filters */}
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearFilters}
            disabled={loading}
            fullWidth
            sx={{ height: 56 }}
          >
            Clear Filters
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  </Box>
);

};

export default SearchBar;
