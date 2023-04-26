import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import MovieList from "./Pages/MovieList";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  let ahshdasd = [];
  const [asdasd, setasdasd] = useState([]);
  const apiKey = "0d063d7aed88ac0312c521da1b31e63f";
  const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&append_to_response=videos`;

  useEffect(() => {
    axios.get(apiUrl).then(({ data }) => setasdasd(data.results));
  }, []);
  console.log("asdasd", asdasd);
  return (
    <div className="h-screen ">
      {/* {asdasd.map(({ poster_path }) => (
        <img src={`${poster_path}`} />
      ))} */}
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/movies" element={<MovieList />}></Route>
      </Routes>
    </div>
  );
}

export default App;
