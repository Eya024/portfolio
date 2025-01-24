import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Home from "./pages/Home";
import Inscription from "./pages/Inscription";
import PlanInterest from "./components/PlanInterest";

import "bootstrap/dist/css/bootstrap.min.css";

const LanguageRoute = ({ children }) => {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    const lang = pathname.split('/')[2]; // Extract the language from the URL

    if (['en', 'fr', 'ar'].includes(lang)) {
      i18n.changeLanguage(lang); // Update the i18n language
      localStorage.setItem('language', lang); // Synchronize the local storage with the URL language

    }
  }, [location, i18n]);

  return children; // Render the child components (Home, Inscription, etc.)
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect from / to /home/fr */}
        <Route path="/" element={<Navigate to="/home/fr" />} />

        {/* Home Route with Language Handling */}
        <Route
          path="/home/:lang"
          element={
            <LanguageRoute>
              <Home />
            </LanguageRoute>
          }
        />

        {/* Inscription Route with Language Handling */}
        <Route
          path="/inscription/:lang"
          element={
            <LanguageRoute>
              <Inscription />
            </LanguageRoute>
          }
        />
        <Route path="/planInterest/:lang" element={
            <LanguageRoute>
              <PlanInterest />
            </LanguageRoute>
          } />
      </Routes>
    </Router>
  );
};

export default App;
