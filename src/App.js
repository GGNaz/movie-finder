import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import MovieList from "./Pages/MovieList";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // let ahshdasd = [];

  // console.log("asdasd", asdasd);
  return (
    <div className="h-screen ">
      {/* {asdasd.slice(0, 5).map(({ poster_path }) => (
        <img
          src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}`}
          className="h-60"
        />
      ))} */}
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/movies" element={<MovieList />}></Route>
      </Routes>
    </div>
  );
}

export default App;
