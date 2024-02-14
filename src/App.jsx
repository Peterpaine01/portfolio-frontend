import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Components
import Header from "./components/Header";

// Pages
import Resume from "./pages/Resume";
import Projet from "./pages/Projet";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Resume />} />
        <Route path="/projet/:id" element={<Projet />} />
      </Routes>
    </Router>
  );
};

export default App;
