import axios from 'axios';

const API_KEY = '527779e43757c5c553ad1ab6fd27b802';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrendingMovies = () =>
  axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);

export const searchMovies = (query, page = 1, filters = {}) => {
  const params = {
    api_key: API_KEY,
    language: 'en-US',
    sort_by: 'popularity.desc',
    include_adult: false,
    include_video: false,
    page,
    ...filters,
  };


  

  // Use `/search/movie` when a query is provided
  return query
    ? axios.get(`${BASE_URL}/search/movie`, { params: { ...params, query } })
    : axios.get(`${BASE_URL}/discover/movie`, { params });
};

export const getMovieDetails = (id) =>
  axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`);
