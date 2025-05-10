import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';

const Logout = () => {
  const { setUser, setFavorites } = useContext(MovieContext); // ⬅️ Add setFavorites
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('favorites'); // Optional: clear persisted favorites
    setUser(null);
    setFavorites([]); // ⬅️ Clear favorites on logout
    navigate('/');
  }, [navigate, setUser, setFavorites]);

  return null;
};

export default Logout;
