import React from "react";
import Navigation from "../Components/Navigation";
import ReactPlayer from "react-player";
import * as BiIcons from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import SearchList from "./SearchList";
import VideoPlayer from "./VideoPlayer";
import { popularMoviesStore } from "../Zustand/popularMoviesStore";
import { shallow } from "zustand/shallow";
import { trendingMoviesStore } from "../Zustand/trendingMoviesStore";
function MovieList() {
  // const [popularList, setPopularMovies] = useState([]);
  const [upcomingList, setUpcomingMovies] = useState([]);
  const [ifPlayerOpen, setIfPlayerOpen] = useState(false);
  const [openMovie, setOpenMovie] = useState({
    isOpen: false,
    movieDetails: {},
  });
  const { popularMovies } = popularMoviesStore((state) => state, shallow);
  const { trendingMovies } = trendingMoviesStore((state) => state, shallow);
  const apiKey = "0d063d7aed88ac0312c521da1b31e63f";
  // const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&append_to_response=videos`;
  // const apiGetTrailers = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US&page=1`;
  const [action, setAction] = useState({ type: "default", response: [] });
  console.log("action", action);

  const getSelectedMovie = (details) => {
    // setIfPlayerOpen(true);
    return setOpenMovie({ isOpen: true, movieDetails: details });
  };

  const closeVideoPlayer = () => {
    // setIfPlayerOpen(false);
    return setOpenMovie({ isOpen: false, movieDetails: {} });
  };

  const actionChecker = () => {
    switch (action?.type) {
      case "default":
        return defaultList();
      case "popular":
        return <div>popular</div>;
      case "search":
        return (
          <SearchList
            reponse={action?.response}
            setIfPlayerOpen={setIfPlayerOpen}
          />
        );
      // return <div>asdasd</div>;
    }
  };

  const trendingMoviesLayout = () => {
    return (
      <div className="flex flex-col gap-2">
        <div className="text-white text-lg font-medium ">Today's Trending</div>
        <div className="flex flex-col gap-3 w-full">
          {trendingMovies?.slice(0, 5)?.map((data, index) => {
            const {
              title,
              release_date,
              original_name,
              backdrop_path,
              vote_average,
              id,
            } = data;
            return (
              <div
                className="flex flex-row w-full  rounded-lg relative "
                key={id}
              >
                <div className=" text-white rounded-l-lg text-xl  bg-customRed/80 w-20 flex justify-center items-center font-semibold">
                  {index + 1}
                </div>
                <div className="relative w-full">
                  <img
                    src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${backdrop_path}`}
                    alt={title}
                    className="h-20 w-full rounded-r-lg"
                  />
                  <div className="absolute bottom-1 left-2 text-white/70 z-20 text-sm ">
                    {title ?? original_name}
                  </div>
                </div>
                <div className="absolute bottom-0 inset-0 bg-gradient-to-t from-customBlack/80 via-customBlack/50 to-customBlack/5" />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const popularMoviesLayout = () => {
    return (
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-row justify-between items-center">
          <div className="text-white text-lg font-medium">Popular Movies</div>
          <button className="text-white text-sm flex flex-row gap-1 items-center ">
            <span>All Movies</span> <BiIcons.BsChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-4 w-full  gap-3">
          {popularMovies.slice(0, 4).map((data, index) => {
            const { poster_path, original_title, id, release_date } =
              data ?? {};
            return (
              <div
                className=" flex flex-col gap-1 h-full min-h-[20vh] cursor-pointer"
                key={index}
                onClick={() => getSelectedMovie(data)}
              >
                <div className="h-full min-h-[20vh] flex flex-col relative ">
                  {/* <ReactPlayer
                    width="100%"
                    height="100%"
                    url={url}
                    controls
                    light
                  /> */}
                  <img
                    src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}`}
                    className="h-full "
                  />
                  <div className="z-40 absolute  group/item w-full h-full hover:bg-customBlack/70 hover:cursor-pointer ">
                    <div className="absolute group/edit invisible  group-hover/item:visible z-40  w-full h-full text-white flex flex-col justify-center items-center">
                      <Player
                        src="https://assets9.lottiefiles.com/packages/lf20_hjyxybfm.json"
                        loop
                        className="h-32 w-32"
                        autoplay
                        key={id}
                      />
                    </div>
                  </div>
                </div>
                <div className="font-light text-xs text-white h-[5vh]">
                  {original_title} ({release_date.split("-")[0]})
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const newMovieslayout = () => {
    const trendingMoviess = [
      {
        title: "Murder Mystery 2",
        url: "https://youtu.be/LM2F56uK0fs",
      },
      {
        title: "Jung_E",
        url: "https://youtu.be/LCxnmfdxJ6s",
      },
    ];
    return (
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-row justify-between items-center">
          <div className="text-white text-lg font-medium">New Movies</div>
          <button className="text-white text-sm flex flex-row gap-1 items-center ">
            <span>All Movies</span> <BiIcons.BsChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-2 w-full gap-3">
          {trendingMoviess.map((data, index) => {
            const { title, url } = data ?? {};
            return (
              <div className=" flex flex-col gap-1" key={index}>
                <div className="h-full min-h-[40vh]">
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    url={url}
                    controls
                    light
                  />
                </div>
                <div className="font-medium text-sm text-white">{title}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const searchSpecificMovie = async (value) => {
    if (value === "") {
      setAction({ type: "default", response: [] });
    } else {
      await axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${value}    `
        )
        .then(({ data, status }) => {
          console.log("search", data);
          if (status === 200) {
            setAction({ type: "search", response: data?.results ?? [] });
          }
        });
    }
  };

  const defaultList = () => {
    return (
      <div className="flex flex-col gap-6">
        {newMovieslayout()}
        {popularMoviesLayout()}
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full bg-customBlack pb-5">
      <Navigation />
      <div className=" p-5 flex flex-col gap-3">
        <div className="bg-customGray/70 flex flex-row justify-between items-center  p-5 rounded-xl">
          <div className="flex flex-row gap-5 text-white">
            <div>Action</div>
            <div>Animation</div>
            <div>Fantasy</div>
            <div>Romance</div>
          </div>
          <div className="relative block ">
            <BiIcons.BsSearch className="absolute left-1 top-3 mx-1 inset-0 text-customBlack" />
            <input
              type="text"
              placeholder="search..."
              className="focus:outline-none h-10 rounded-xl pl-8 text-sm w-80 border-l"
              onChange={(e) => searchSpecificMovie(e.target.value)}
            />
          </div>
        </div>
        {!openMovie.isOpen ? (
          <div className="flex flex-row gap-2">
            <div className="basis-3/4 flex flex-col gap-6">
              {actionChecker()}
            </div>
            {!ifPlayerOpen && (
              <div className="basis-1/4 border-l border-gray-600 px-2">
                {trendingMoviesLayout()}
              </div>
            )}
          </div>
        ) : (
          <VideoPlayer
            closeVideoPlayer={closeVideoPlayer}
            details={openMovie?.movieDetails ?? {}}
          />
        )}
      </div>
    </div>
  );
}

export default MovieList;
