import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const CountryDetail = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then(response => response.json())
      .then(data => {
        setCountry(data[0]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching country:', error);
        setLoading(false);
      });
  }, [code]);

  if (loading) return <div className="container text-center my-5">Loading...</div>;
  if (!country) return <div className="container text-center my-5">Country not found</div>;

  return (
    <div className="container my-5">
      <motion.h2 
        className="text-center mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {country.name.common}
      </motion.h2>
      <div className="row">
        <motion.div 
          className="col-md-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={country.flags.png} alt={country.name.common} className="img-fluid" />
        </motion.div>
        <motion.div 
          className="col-md-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p><strong>Native Name:</strong> {country.name.nativeName ? Object.values(country.name.nativeName)[0].common : 'N/A'}</p>
          <p><strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Subregion:</strong> {country.subregion}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Latitude and Longitude:</strong> {country.latlng ? country.latlng.join(', ') : 'N/A'}</p>
          <p><strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
          <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
          <p><strong>Calling Codes:</strong> {country.idd.root + (country.idd.suffixes ? country.idd.suffixes.join(', ') : '')}</p>
          <p><strong>Timezones:</strong> {country.timezones ? country.timezones.join(', ') : 'N/A'}</p>
          <p><strong>Demonym:</strong> {country.demonyms?.eng?.m || 'N/A'}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default CountryDetail;