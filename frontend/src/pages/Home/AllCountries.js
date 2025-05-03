import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Swal from 'sweetalert2';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddFavorite = async (cca3) => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        title: 'Please Log In',
        text: 'You need to log in to add countries to your favorites.',
        icon: 'warning',
        confirmButtonText: 'Go to Login',
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api/users/favorites`,
        { cca3 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire({
        title: 'Success',
        text: 'Country added to favorites!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'Failed to add country to favorites.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

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
      <div className="container py-4" style={{ marginTop: '50px' }}>
        <div className="d-flex justify-content-between align-items-center mb-5">
          <motion.h2
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            All Countries
          </motion.h2>
          <div className="search-bar">
            <input
              type="text"
              className="form-control"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={handleSearch}
              style={{ maxWidth: '250px' }}
            />
          </div>
        </div>
        <div className="row">
          {filteredCountries.length > 0 ? (
            filteredCountries.map(country => (
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
                    <div className="d-flex justify-content-between">
                      <Link to={`/country/${country.cca3}`} className="btn btn-primary">View Details</Link>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleAddFavorite(country.cca3)}
                        title="Add to Favorites"
                      >
                        <FaHeart />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No countries found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCountries;