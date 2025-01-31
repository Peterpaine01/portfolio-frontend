import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Components
import Header from "./components/Header";

// Pages
import Resume from "./pages/Resume";
import Projet from "./pages/Projet";
import VideoUpload from "./pages/VideoUpload";

const App = () => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUser = await axios.get(
          `${import.meta.env.VITE_API_URL}/users`
        );

        setUser(responseUser.data[0]);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the data yet
    return <p>Loading</p>;
  }

  console.log("user app > ", user);
  return (
    <Router>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Resume user={user} />} />
        <Route path="/projet/:id" element={<Projet />} />
        {/* <Route path="/videoupload" element={<VideoUpload />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
