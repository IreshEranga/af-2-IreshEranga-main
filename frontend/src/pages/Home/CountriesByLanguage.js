import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Navbar from '../../components/Navbar';
import './CountriesByLanguage.css'

// Curated list of languages
const languages = [
  { code: 'english', name: 'English' },
  { code: 'spanish', name: 'Spanish' },
  { code: 'french', name: 'French' },
  { code: 'german', name: 'German' },
  { code: 'chinese', name: 'Chinese' },
  { code: 'arabic', name: 'Arabic' },
  { code: 'russian', name: 'Russian' },
  { code: 'portuguese', name: 'Portuguese' },
  { code: 'ton', name: 'Tongan' },
  { code: 'hin', name: 'Hindi' },
  { code: 'tam', name: 'Tamil' },
  { code: 'sin', name: 'Sinhala' },
];

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const selectVariants = {
  hover: { scale: 1.02, transition: { duration: 0.2 } },
  focus: { borderColor: '#007bff', transition: { duration: 0.3 } },
};

const CountriesByLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCountries = useCallback(async (language) => {
    if (!language) return;
    setLoading(true);
    try {
      const response = await fetch(`https://restcountries.com/v3.1/lang/${language}`);
      if (!response.ok) {
        throw new Error('Language not found');
      }
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      setCountries([]);
      Swal.fire({
        title: 'Error',
        text: `No countries found for ${language}. Please try another language.`,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedLanguage) {
      fetchCountries(selectedLanguage);
    }
  }, [selectedLanguage, fetchCountries]);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <ScaleLoader color="#007bff" height={50} width={5} />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="language-container">
        <div className="language-content">
          <div className="language-header">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              Explore Countries by Language
            </motion.h2>
            <div className="language-select">
              <motion.select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                variants={selectVariants}
                whileHover="hover"
                whileFocus="focus"
                aria-label="Select a language"
              >
                <option value="" disabled>
                  Select a Language
                </option>
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </motion.select>
              {/* <label>Language</label> */}
            </div>
          </div>
          <div className="country-grid">
            {countries.length > 0 ? (
              countries.map((country) => (
                <motion.div
                  className="country-card"
                  key={country.cca3}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <img
                    src={country.flags.png}
                    alt={country.name.common}
                    loading="lazy"
                  />
                  <div className="country-card-body">
                    <h5>{country.name.common}</h5>
                    <p><strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}</p>
                    <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                    <p><strong>Region:</strong> {country.region}</p>
                    <Link to={`/country/${country.cca3}`}>View Details</Link>
                  </div>
                </motion.div>
              ))
            ) : (
              selectedLanguage && (
                <div className="no-results">
                  No countries found for {languages.find((l) => l.code === selectedLanguage)?.name}.
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountriesByLanguage;