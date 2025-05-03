import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Navbar from '../components/Navbar';

const Regions = () => {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [regionLoading, setRegionLoading] = useState(false);

  // Fetch all countries to extract unique regions
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const uniqueRegions = [...new Set(data.map(country => country.region))].filter(region => region);
        setRegions(uniqueRegions.sort());
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching regions:', error);
        setLoading(false);
      });
  }, []);

  // Fetch countries for the selected region
  useEffect(() => {
    if (selectedRegion) {
      setRegionLoading(true);
      fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`)
        .then(response => response.json())
        .then(data => {
          setCountries(data);
          setRegionLoading(false);
        })
        .catch(error => {
          console.error(`Error fetching countries for ${selectedRegion}:`, error);
          setRegionLoading(false);
        });
    }
  }, [selectedRegion]);

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: { 
      scale: 1.05,
      backgroundColor: "transparent",
      transition: { 
        duration: 0.3 
      }
    }
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
        <Navbar/>
        <div className="container py-4" style={{marginTop:'80px'}}>
      <motion.h2 
        className="text-center mb-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {selectedRegion ? `Countries in ${selectedRegion}` : 'Regions'}
      </motion.h2>

      {!selectedRegion ? (
        <div className="row">
          {regions.map(region => (
            <motion.div 
              className="col-6 col-md-3 mb-4" 
              key={region}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onClick={() => setSelectedRegion(region)}
            >
              <div className="card h-100 shadow-sm text-center">
                <div className="card-body d-flex align-items-center justify-content-center">
                  <h5 className="card-title mb-0">{region}</h5>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <>
          <div className="mb-4">
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setSelectedRegion(null);
                setCountries([]);
              }}
            >
              Back to Regions
            </button>
          </div>
          {regionLoading ? (
            <div className="container d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
              <ScaleLoader color="#007bff" height={50} width={5} />
            </div>
          ) : (
            <div className="row">
              {countries.map(country => (
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
                          objectFit: 'cover' 
                        }} 
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{country.name.common}</h5>
                      <p className="card-text"><strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}</p>
                      <p className="card-text"><strong>Population:</strong> {country.population.toLocaleString()}</p>
                      <p className="card-text"><strong>Region:</strong> {country.region}</p>
                      <p className="card-text"><strong>Subregion:</strong> {country.subregion || 'N/A'}</p>
                      <p className="card-text"><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
                      <p className="card-text"><strong>Currency:</strong> {country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
                      <Link to={`/country/${country.cca3}`} className="btn btn-primary w-100">View Details</Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
    </div>
  );
};

export default Regions;