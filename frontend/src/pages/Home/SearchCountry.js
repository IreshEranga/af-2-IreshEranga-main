import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';

const SearchCountry = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError(null);
    fetch(`https://restcountries.com/v3.1/name/${searchTerm}`)
      .then(response => {
        if (!response.ok) throw new Error('No countries found');
        return response.json();
      })
      .then(data => {
        setSearchResults(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setSearchResults([]);
        setLoading(false);
      });
  };

  return (
    <div>
      <Navbar/>
      <div className="container" style={{marginTop:'80px'}}>
      <motion.h2 
        className="text-center my-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Search Country
      </motion.h2>
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter country name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" type="button" onClick={handleSearch}>Search</button>
      </div>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {searchResults.map(country => (
          <motion.div 
            className="col-md-4 mb-4" 
            key={country.cca3}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card">
              <img src={country.flags.png} className="card-img-top" alt={country.name.common} />
              <div className="card-body">
                <h5 className="card-title">{country.name.common}</h5>
                <p className="card-text"><strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}</p>
                <p className="card-text"><strong>Population:</strong> {country.population.toLocaleString()}</p>
                <p className="card-text"><strong>Region:</strong> {country.region}</p>
                <Link to={`/country/${country.cca3}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default SearchCountry;