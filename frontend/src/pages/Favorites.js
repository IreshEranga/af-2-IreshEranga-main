import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Swal from 'sweetalert2';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        title: 'Please Log In',
        text: 'You need to log in to view your favorite countries.',
        icon: 'warning',
        confirmButtonText: 'Go to Login',
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    const fetchFavorites = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'https://af-2-iresh-eranga-main.vercel.app/api';
        const response = await axios.get(`${apiUrl}/users/favorites`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Fetch full country data for each favorite cca3
        const favoriteCountries = await Promise.all(
          response.data.favorites.map(async (cca3) => {
            const countryResponse = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`);
            return countryResponse.json();
          })
        );
        setFavorites(favoriteCountries.flat()); // Flatten array of country data
        setLoading(false);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error.response?.data?.message || 'Failed to fetch favorite countries.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [navigate]);

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    hover: {
      scale: 1.05,
      backgroundColor: 'transparent',
      transition: { duration: 0.3 },
    },
  };

  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <ScaleLoader color="#007bff" height={50} width={5} />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container py-4" style={{marginTop:'80px'}}>
        <motion.h2
          className="text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          My Favorite Countries
        </motion.h2>
        <div className="row">
          {favorites.length > 0 ? (
            favorites.map(country => (
              <motion.div
                className="col-6 col-md-3 mb-4"
                key={country.cca3}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <div className="card h-100 shadow-sm">
                  <div style={{ height: '150px', overflow: 'hidden' }}>
                    <img
                      src={country.flags.png}
                      className="card-img-top"
                      alt={country.name.common}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{country.name.common}</h5>
                    <p className="card-text"><strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}</p>
                    <p className="card-text"><strong>Population:</strong> {country.population.toLocaleString()}</p>
                    <p className="card-text"><strong>Region:</strong> {country.region}</p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>You haven't added any favorite countries yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;