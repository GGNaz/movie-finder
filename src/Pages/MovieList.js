import React from "react";
import Navigation from "../Components/Navigation";
import ReactPlayer from "react-player";
import * as BiIcons from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import SearchList from "./SearchList";
function MovieList() {
  const [popularList, setPopularMovies] = useState([]);
  const apiKey = "0d063d7aed88ac0312c521da1b31e63f";
  const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&append_to_response=videos`;
  const [action, setAction] = useState({ type: "default", response: [] });
  console.log("action", action);
  useEffect(() => {
    axios.get(apiUrl).then(({ data }) => setPopularMovies(data.results));
  }, []);

  const actionChecker = () => {
    switch (action?.type) {
      case "default":
        return defaultList();
      case "popular":
        return <div>popular</div>;
      case "search":
        return <SearchList reponse={action?.response} />;
      // return <div>asdasd</div>;
    }
  };

  const trailerList = [
    {
      title: "Blue Beetle",
      url: "https://youtu.be/vS3_72Gb-bI",
      release: "August 18, 2023",
      views: "19M",
    },
    {
      title: "Black Panther: Wakanda Foreve",
      url: "https://youtu.be/_Z3QKkl1WyM",
      release: "November 11, 2022",
      views: "42M",
    },
    {
      title: "Fast X",
      url: "https://youtu.be/32RAq6JzY-w",
      release: "May 19, 2023",
      views: "37M",
    },
  ];

  const newTrailers = () => {
    return (
      <div className="flex flex-col gap-2">
        <div className="text-white text-lg font-medium">New Trailers</div>
        <div className="flex flex-col gap-3">
          {trailerList.map((data, index) => {
            const { title, release, views, url } = data;
            return (
              <div className="flex flex-col gap-1" key={index}>
                <div className=" h-48">
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    url={url}
                    controls
                    light
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-white text-sm flex flex-row justify-between">
                    <div>{title}</div>
                    <div className="flex flex-row gap-1 items-center">
                      <BiIcons.BsEye size={18} />
                      <span>{views}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Release On {release}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const watchTrailer = async (id) => {
    await axios
      .get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`)
      .then((res) => {
        return console.log("res", res);
      });
  };

  const popularMovies = () => {
    console.log("popularList", popularList);

    return (
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-row justify-between items-center">
          <div className="text-white text-lg font-medium">Popular Movies</div>
          <button className="text-white text-sm flex flex-row gap-1 items-center ">
            <span>All Movies</span> <BiIcons.BsChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-4 w-full  gap-3">
          {popularList.slice(0, 4).map((data, index) => {
            const { poster_path, original_title, id, release_date } =
              data ?? {};
            return (
              <div
                className=" flex flex-col gap-1 h-full min-h-[20vh] cursor-pointer"
                key={index}
                onClick={() => watchTrailer(id)}
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

  const trendingMovies = () => {
    const trendingMovies = [
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
          {trendingMovies.map((data, index) => {
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
        {trendingMovies()}
        {popularMovies()}
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
          <div>
            <input
              type="text"
              placeholder="search..."
              className="focus:outline-none h-10 rounded-xl px-2 text-sm w-72"
              onChange={(e) => searchSpecificMovie(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="basis-3/4 flex flex-col gap-6">{actionChecker()}</div>
          <div className="basis-1/4 border-l border-gray-600 px-2">
            {newTrailers()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieList;
