import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage from '../../assets/plane.jpg';

const Home = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <motion.h1 
            className="display-4 fw-bold text-primary"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Explore the World with Explore World
          </motion.h1>

          <motion.p
            className="lead mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover detailed information about every country on Earth using our comprehensive, user-friendly interface. Our platform fetches real-time data powered by the REST Countries API to present rich, structured content including:
          </motion.p>

          <motion.ul 
            className="list-group list-group-flush mb-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: 0.6,
                  staggerChildren: 0.2
                }
              }
            }}
          >
            {[
              '🌍 Country names, codes, and flags',
              '🗣️ Official languages and demonyms',
              '💰 Currencies and economic indicators',
              '📍 Capitals, regions, and geographic coordinates',
              '👥 Population and timezones'
            ].map((item, index) => (
              <motion.li 
                key={index} 
                className="list-group-item"
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div 
            className="d-flex gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <Link to="/allCountries" className="btn btn-primary btn-lg">Browse All Countries</Link>
            <Link to="/search" className="btn btn-outline-primary btn-lg">Search by Name</Link>
          </motion.div>
        </div>

        <div className="col-md-6 text-center">
          <motion.img 
            src={heroImage} 
            alt="World Map" 
            className="img-fluid"
            style={{ maxHeight: '400px' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;