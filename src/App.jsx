import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Components
import Header from "./components/Header";

// Pages
import Resume from "./pages/Resume";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Resume />} />
      </Routes>
    </Router>
  );
};

export default App;
