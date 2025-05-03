import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import AllCountries from "../pages/Home/AllCountries";
import SearchCountry from "../pages/Home/SearchCountry";
import CountryDetail from "../pages/Home/CountryDetail";
import Regions from "../pages/Regions";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Favorites from "../pages/Favorites";
import CountriesByLanguage from "../pages/Home/CountriesByLanguage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allCountries" element={<AllCountries />} />
        <Route path="/search" element={<SearchCountry />} />
        <Route path="/country/:code" element={<CountryDetail />} />
        <Route path="/regions" element={<Regions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/countriesByLanguage" element={<CountriesByLanguage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;