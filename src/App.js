import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Inscription from "./pages/Inscription";
import "bootstrap/dist/css/bootstrap.min.css";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/inscription" element={<Inscription />} />  

        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
