import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  // Inline styles
  const styles = {
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(10px)',
      padding: '0.5rem 1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '60px',
    },
    navbarBrand: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
    },
    navbarLogo: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      marginRight: '0.5rem',
    },
    navbarTitle: {
      color: '#fff',
      fontFamily: "'Arial', sans-serif",
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    navbarMenu: {
      display: 'flex',
      alignItems: 'center',
    },
    navLink: {
      color: '#fff',
      fontFamily: "'Arial', sans-serif",
      fontSize: '1rem',
      fontWeight: 500,
      textDecoration: 'none',
      padding: '0.5rem 1rem',
      marginLeft: '1rem',
    },
    logoutButton: {
      color: '#fff',
      fontFamily: "'Arial', sans-serif",
      fontSize: '1rem',
      fontWeight: 500,
      background: 'transparent',
      border: '1px solid #fff',
      padding: '0.25rem 1rem',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    hamburger: {
      display: 'none',
      background: 'none',
      border: 'none',
      color: '#fff',
      fontSize: '1.5rem',
      cursor: 'pointer',
    },
    // Mobile styles
    mobileMenu: {
      '@media (max-width: 768px)': {
        navbarMenu: {
          display: 'none',
        },
        hamburger: {
          display: 'block',
        },
      },
    },
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.navbarBrand}>
        <img src={logo} alt="Explore World Logo" style={styles.navbarLogo} />
        <span style={styles.navbarTitle}>Explore World</span>
      </Link>
      <button
        style={styles.hamburger}
        aria-label="Toggle menu"
      >
        {/* Hamburger icon logic can be added if needed */}
      </button>
      <div style={styles.navbarMenu}>
        <Link to="/" style={styles.navLink}>Home</Link>
        <Link to="/allCountries" style={styles.navLink}>All Countries</Link>
        <Link to="/search" style={styles.navLink}>Search by Name</Link>
        <Link to="/regions" style={styles.navLink}>Filter by Region</Link>
        <Link to="/countriesByLanguage" style={styles.navLink}>Search By Language</Link>
        {isLoggedIn ? (
          <>
            <Link to="/favorites" style={styles.navLink}>Favorites</Link>
            <button style={styles.logoutButton} onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.navLink}>Login</Link>
            <Link to="/register" style={styles.navLink}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;