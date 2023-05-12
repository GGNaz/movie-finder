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
import { genreStore } from "../Zustand/genreStore";
import { getAPI } from "../API/apiRoutes";
import { upcomingMoviesStore } from "../Zustand/newMoviesStore";
import moment from "moment";
import logo from "../Assets/logo.png";
import { landscapeformat, portraitformat } from "../Assets/imagesformat";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function MovieList() {
  // const [popularList, setPopularMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("select");

  const [ifPlayerOpen, setIfPlayerOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState([]);
  const [openMovie, setOpenMovie] = useState({
    isOpen: false,
    movieDetails: {},
  });
  const { popularMovies } = popularMoviesStore((state) => state, shallow);
  const { trendingMovies } = trendingMoviesStore((state) => state, shallow);
  const { upcomingMovies } = upcomingMoviesStore((state) => state, shallow);
  const { genre } = genreStore((state) => state, shallow);
  const [search, setSearch] = useState("");
  console.log("search", search);
  // const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&append_to_response=videos`;
  // const apiGetTrailers = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US&page=1`;
  const [action, setAction] = useState({ type: "default", response: [] });
  console.log("filter", filter);

  const storeFiltersData = (index, type, value) => {
    let copyFilter = [...filter];
    if (value !== "") {
      copyFilter.push(`${type}${value}`);
    } else {
      copyFilter.splice(0, index);
    }

    setFilter(copyFilter);
  };

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
    console.log("trendingMovies", trendingMovies);
    function convertNumber(number) {
      if (number >= 1000) {
        return number / 1000 + "k";
      } else {
        return number.toString();
      }
    }
    return (
      <div className="flex flex-col gap-2">
        <div className="text-white text-lg font-medium ">Today's Trending</div>
        <div className="flex flex-col gap-3 w-full">
          {trendingMovies?.slice(0, 5)?.map((data, index) => {
            const {
              title,
              release_date,
              original_name,
              poster_path,
              vote_average,
              id,
              popularity,
            } = data;
            return (
              <div
                className="flex flex-row bg-customGray/60 hover:bg-white/50 cursor-pointer "
                key={id}
                onClick={() => getSelectedMovie(data)}
              >
                <img
                  src={`${portraitformat}${poster_path}`}
                  alt={title}
                  className="h-24 p-1"
                />

                <div className="flex flex-col gap-1 w-full p-1 justify-between">
                  <div className="text-sm text-white/80">
                    {" "}
                    {title ?? original_name}
                  </div>
                  <div className="flex flex-row justify-between text-xs text-white">
                    <div className="flex flex-row gap-1">
                      {" "}
                      <BiIcons.BsFillStarFill />
                      {vote_average?.toFixed(2)}
                    </div>
                    <div className="flex flex-row gap-1">
                      {" "}
                      <BiIcons.BsFillEyeFill />
                      {convertNumber(popularity?.toFixed(0))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // <div
  //   className="flex flex-row w-full  rounded-lg relative "
  //   key={id}
  // >
  //   <div className=" text-white rounded-l-lg text-xl  bg-customRed/80 w-20 flex justify-center items-center font-semibold">
  //     {index + 1}
  //   </div>
  //   <div className="relative w-full">
  //     <img
  //       src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${backdrop_path}`}
  //       alt={title}
  //       className="h-20 w-full rounded-r-lg"
  //     />
  //     <div className="absolute bottom-1 left-2 text-white/70 z-20 text-sm ">
  //       {title ?? original_name}
  //     </div>
  //   </div>
  //   <div className="absolute bottom-0 inset-0 bg-gradient-to-t from-customBlack/80 via-customBlack/50 to-customBlack/5" />
  // </div>

  const popularMoviesLayout = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const reponsiveLayoutForPopular = (data) => {
      const { poster_path, original_title, id, release_date } = data ?? {};
      return (
        <div
          className=" flex flex-col gap-1 h-full min-h-[20vh] cursor-pointer"
          key={id}
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
            <div className="absolute bottom-0 inset-0 bg-gradient-to-br from-customBlack/80 via-customBlack/20 to-customBlack/5" />
            <div className="absolute top-2 left-2">
              <img src={logo} alt={original_title} className="h-16" />
            </div>
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
            {original_title} ({release_date?.split("-")[0]})
          </div>
        </div>
      );
    };
    return (
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-row justify-between items-center">
          <div className="text-white text-lg font-medium">Popular Movies</div>
          <button className="text-white text-sm flex flex-row gap-1 items-center ">
            <span>All Movies</span> <BiIcons.BsChevronRight />
          </button>
        </div>

        <div className="lg:grid hidden grid-cols-4 w-full  gap-3">
          {popularMovies.slice(0, 4).map(reponsiveLayoutForPopular)}
        </div>
        <div className="grid lg:hidden grid-cols-2 w-full  gap-3">
          {popularMovies.slice(0, 2).map(reponsiveLayoutForPopular)}
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
    const reponsiveLayoutForUpcoming = (data) => {
      const { backdrop_path, title, id, release_date, popularity } = data ?? {};
      return (
        <div
          className=" flex flex-col gap-1 cursor-pointer"
          key={id}
          onClick={() => getSelectedMovie(data)}
        >
          <div className="h-full relative">
            <div className="absolute top-2 left-2">
              <img src={logo} alt={title} className="h-16" />
            </div>
            <img
              src={`${landscapeformat}${backdrop_path}`}
              alt={title}
              // className="h-20 w-full rounded-r-lg"
            />
            <div className="absolute bottom-0 inset-0 bg-gradient-to-t from-customBlack/80 via-customBlack/50 to-customBlack/5" />
            <div className="flex flex-col  absolute bottom-2 left-2 z-10">
              <div className="font-medium text-lg lg:text-2xl text-white/80">
                {title}
              </div>
              <div className="text-xs text-white/70">
                Release date: {moment(release_date)?.format("LL")}
              </div>
            </div>
          </div>
        </div>
      );
    };
    return (
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-row justify-between items-center">
          <div className="text-white text-lg font-medium">Upcoming Movies</div>
          <button className="text-white text-sm flex flex-row gap-1 items-center ">
            <span>All Movies</span> <BiIcons.BsChevronRight />
          </button>
        </div>

        <div className="lg:grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 w-full grid md:hidden  gap-3">
          {upcomingMovies?.slice(0, 2).map(reponsiveLayoutForUpcoming)}
        </div>
        <div className="hidden md:grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 w-full lg:hidden  gap-3">
          {upcomingMovies?.slice(0, 1).map(reponsiveLayoutForUpcoming)}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const searchSpecificMovie = async () => {
      if (search === "") {
        setAction({ type: "default", response: [] });
      } else {
        await getAPI("/search/movie", `&query=${search}`).then(
          ({ data, status }) => {
            console.log("search", data);
            if (status === 200) {
              setAction({ type: "search", response: data?.results ?? [] });
            }
          }
        );
      }
    };
    searchSpecificMovie();
  }, [search]);

  const defaultList = () => {
    return (
      <div className="flex flex-col gap-6">
        {newMovieslayout()}
        {popularMoviesLayout()}
      </div>
    );
  };

  const filterSectionLayout = () => {
    const sortByList = [
      { value: "popularity.asc", label: "Popularity" },
      { value: "release_date.asc", label: "Date released" },
      { value: "vote_average.gte=7", label: "Rating" },
    ];

    const soryByCountry = [
      {
        value: "zh",
        label: "Chinese",
      },
      {
        value: "en",
        label: "English",
      },
      {
        value: "id",
        label: "Indonesia",
      },

      {
        value: "ja",
        label: "Japanese",
      },
      {
        value: "ko",
        label: "Korea",
      },
      {
        value: "tl",
        label: "Philippines",
      },
      {
        value: "ru",
        label: "Russia",
      },
    ];
    return (
      <div className="bg-customGray/60 p-2">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            <div>Filters</div>
          </div>
          <div className="flex flex-col gap-1">
            <select
              className="focus:outline-none border border-customBlack rounded-lg text-sm h-9 cursor-pointer"
              // value={selectedGenre}
              name="with_genres"
              onChange={(e) => {
                // setSelectedGenre(e.target.value);
                storeFiltersData(1, "&with_genres=", e.target.value);
              }}
            >
              <option value="">Select genre</option>
              {genre.map(({ name, id }) => {
                return (
                  <option
                    key={id}
                    value={id}
                    // className="border w-fit border-customBlack rounded-lg text-sm px-2"
                  >
                    {name}
                  </option>
                );
              })}
            </select>
            <div className="flex flex-row gap-1 w-full">
              <select
                className="focus:outline-none w-full border border-customBlack rounded-lg text-sm h-9 cursor-pointer"
                // value={selectedGenre}
                // name="with_genres"
                onChange={(e) => {
                  // setSelectedGenre(e.target.value);
                  storeFiltersData(2, "&sort_by=", e.target.value);
                }}
              >
                <option value="">Sort by</option>
                {sortByList.map(({ value, label }) => (
                  <option value={value}>{label}</option>
                ))}
              </select>
              <select
                className="focus:outline-none w-full border border-customBlack rounded-lg text-sm h-9 cursor-pointer"
                // value={selectedGenre}
                // name="with_genres"
                onChange={(e) => {
                  // setSelectedGenre(e.target.value);
                  storeFiltersData(
                    3,
                    "&with_original_language=",
                    e.target.value
                  );
                }}
              >
                <option value="">Select country</option>
                {soryByCountry.map(({ value, label }) => (
                  <option value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* <input
              type="text"
              placeholder="eg. action"
              className="h-9 focus:outline-none border rounded-md text-sm"
            /> */}
          </div>
          <div className="flex flex-row gap-1 pt-2">
            <button
              className="bg-blue-400 p-1 cursor-pointer w-full rounded-lg text-center text-customBlack"
              onClick={() => performFilter()}
            >
              Filter
            </button>
            <button
              className="bg-red-400 p-1 cursor-pointer w-full rounded-lg text-center text-customBlack"
              onClick={() => setAction({ type: "default", response: [] })}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    );
  };

  const performFilter = async () => {
    // console.log("concatFilter", filter.join(""));
    if (filter?.length > 0) {
      await getAPI(`/discover/movie`, filter?.join("")).then(
        ({ data, status }) => {
          if (status === 200)
            return setAction({ type: "search", response: data?.results ?? [] });
        }
      );
    }
  };

  const trendingMoviesMobileLayout = () => {
    const settings = {
      showArrows: false,
      showThumbs: false,
      infiniteLoop: true,
      autoPlay: true,
      emulateTouch: true,
      autoFocus: false,
    };
    return (
      <div className="flex md:hidden flex-col">
        <Carousel {...settings}>
          {trendingMovies?.slice(0, 5)?.map((data, index) => {
            const {
              title,
              release_date,
              original_name,
              poster_path,
              backdrop_path,
              vote_average,
              id,
              popularity,
            } = data;
            return (
              <div
                className="flex flex-row border-none relative cursor-pointer transform hover:scale-110 origin-center transition duration-300 ease-in-out"
                key={id}
                onClick={() => getSelectedMovie(data)}
              >
                <img
                  src={`${landscapeformat}${backdrop_path}`}
                  alt={title}
                  className="h-full p-1 "
                />
                <div className="absolute bg-black/60 top-0 left-0 h-full w-full">
                  <div className="text-sm font-semibold text-white/80 absolute top-5 left-5">
                    {" "}
                    {title ?? original_name}
                  </div>
                </div>

                {/* <div className="flex flex-col gap-1 w-full p-1 justify-between">
                  <div className="text-sm text-white/80">
                    {" "}
                    {title ?? original_name}
                  </div>
                  <div className="flex flex-row justify-between text-xs text-white">
                    <div className="flex flex-row gap-1">
                      {" "}
                      <BiIcons.BsFillStarFill />
                      {vote_average?.toFixed(2)}
                    </div>
                    <div className="flex flex-row gap-1">
                      {" "}
                      <BiIcons.BsFillEyeFill />
                    </div>
                  </div>
                </div> */}
              </div>
            );
          })}
        </Carousel>
      </div>
    );
  };

  const filterBtn = () => {
    console.log(
      "🚀 ~ file: MovieList.js:534 ~ filterBtn ~ setShowFilter:",
      showFilter
    );
    return (
      <div className="flex flex-row justify-between items-center md:hidden">
        <div className="text-white text-lg font-medium">Today's Trending</div>
        <div
          className={`${
            showFilter ? "bg-white/50  text-customBlack  px-3" : "text-white/80"
          } flex flex-row gap-2 cursor-pointer`}
          onMouseEnter={() => setShowFilter(true)}
          onMouseLeave={() => setShowFilter(false)}
        >
          {showFilter && (
            <div className=" animate__animated animate__fadeInRight">
              Filter
            </div>
          )}
          <BiIcons.BsSliders className="text-xl " />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full  pb-5 bg-customBlack">
      <Navigation setSearch={setSearch} />
      <div className=" p-5 flex flex-col gap-3">
        {!openMovie.isOpen ? (
          <div className="flex flex-row gap-2">
            <div className="md:basis-3/5 lg:basis-3/4 flex flex-col gap-2 md:gap-6">
              {/* {genreLayout()} */}
              {filterBtn()}
              {trendingMoviesMobileLayout()}
              {actionChecker()}
            </div>
            {!ifPlayerOpen && (
              <div className="hidden md:basis-2/5 lg:basis-1/4  md:flex flex-col gap-2 border-l border-gray-600 px-2">
                {filterSectionLayout()}
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
