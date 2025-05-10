import React, { createContext, useState, useEffect } from 'react';

export const MovieContext = createContext();

const MovieProvider = ({ children }) => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
const isLoggedIn = !!user;

useEffect(() => {
  localStorage.setItem("user", JSON.stringify(user));
}, [user]);



  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem("lastQuery") || '');
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);
  const [darkMode, setDarkMode] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [minRating, setMinRating] = useState(0);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Persist last search query
  useEffect(() => {
    localStorage.setItem("lastQuery", searchQuery);
  }, [searchQuery]);

  return (
    <MovieContext.Provider value={{
      user, setUser, isLoggedIn,
      movies, setMovies,
      searchQuery, setSearchQuery,
      favorites, setFavorites,
      darkMode, setDarkMode,
      page, setPage,
      totalPages, setTotalPages,
      selectedGenre, setSelectedGenre,
      selectedYear, setSelectedYear,
      minRating, setMinRating
    }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
