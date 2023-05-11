import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import MovieList from "./Pages/MovieList";
import { useEffect, useState } from "react";
import axios from "axios";
// import "animate.css";
import { popularMoviesStore } from "./Zustand/popularMoviesStore";
import { shallow } from "zustand/shallow";
import { trendingMoviesStore } from "./Zustand/trendingMoviesStore";
import { genreStore } from "./Zustand/genreStore";
import { countryStore } from "./Zustand/countryStore";
import { upcomingMoviesStore } from "./Zustand/newMoviesStore";
import { memo } from "react";
import hocLoading from "./Components/HOC";

function App() {
  const { storePopularMovies } = popularMoviesStore((state) => state, shallow);
  const { storecountry } = countryStore((state) => state, shallow);

  const { storeTrendingMovies } = trendingMoviesStore(
    (state) => state,
    shallow
  );
  const { storeGenre } = genreStore((state) => state, shallow);
  const { storeupcomingMovies } = upcomingMoviesStore(
    (state) => state,
    shallow
  );
  const loadAppApi = () => {
    storePopularMovies();
    storeTrendingMovies();
    storeGenre();
    storecountry();
    storeupcomingMovies();
  };

  useEffect(() => {
    loadAppApi();
  }, []);

  return (
    <div className="h-screen ">
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/movies" element={<MovieList />}></Route>
      </Routes>
    </div>
  );
}

export default memo(hocLoading(App));
