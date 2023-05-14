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
  const [filterInputs, setFilterInputs] = useState({
    genre: "",
    sort: "",
    country: "",
  });

  const [ifPlayerOpen, setIfPlayerOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [hoverEffectFilter, setHoverEffectFilter] = useState(false);
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
  const [action, setAction] = useState({
    type: "default",
    apiRoute: null,
    query: null,
    title: null,
    // response: null,
  });

  console.log("filter", filter);

  const handleResize = () => {
    if (window?.innerWidth > 770) {
      return setShowFilter(false);
    } else {
      return;
    }
  };
  useEffect(() => {
    window?.addEventListener("resize", handleResize);

    return async () => {
      await window?.removeEventListener("resize", handleResize);
    };
  }, []);

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
        return <SearchList {...action} setIfPlayerOpen={setIfPlayerOpen} />;

      // return <div>asdasd</div>;
    }
  };

  const trendingMoviesLayout = () => {
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
              overview,
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
                  <div className="text-sm md:text-md font-bold text-white/80">
                    {" "}
                    {title ?? original_name}
                  </div>
                  <div className="text-xs text-white/80 truncate w-40 max-w-md">
                    {overview}
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

  const getAllPopularMovies = () => {
    const params = {
      type: "search",
      title: "List of Popular Movies",
      apiRoute: "/movie/popular",
      query: "&append_to_response=videos",
    };
    return setAction(params);
  };

  const getAllUpcomingMovies = () => {
    const params = {
      type: "search",
      title: "List of Upcoming Movies",
      apiRoute: "/movie/upcoming",
      query: "&language=en-US",
    };
    return setAction(params);
  };

  const popularMoviesLayout = () => {
    const reponsiveLayoutForPopular = (data) => {
      const { poster_path, original_title, id, release_date } = data ?? {};
      return (
        <div
          className=" flex flex-col gap-1 h-full min-h-[20vh] cursor-pointer"
          key={id}
          onClick={() => getSelectedMovie(data)}
        >
          <div className="h-full min-h-[20vh] flex flex-col relative ">
            <div className="absolute bottom-0 inset-0 bg-gradient-to-br from-customBlack/80 via-customBlack/20 to-customBlack/5" />

            <img
              src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}`}
              className="h-full "
              alt={original_title}
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
          <button
            className="text-white text-sm flex flex-row gap-1 items-center "
            onClick={() => {
              getAllPopularMovies();
            }}
          >
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
    const reponsiveLayoutForUpcoming = (data) => {
      const { backdrop_path, title, id, release_date, popularity } = data ?? {};
      return (
        <div
          className=" flex flex-col gap-1 cursor-pointer"
          key={id}
          onClick={() => getSelectedMovie(data)}
        >
          <div className="h-full relative">
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
          <button
            className="text-white hover:text-white/70 text-sm flex flex-row gap-1 items-center "
            onClick={() => {
              getAllUpcomingMovies();
            }}
          >
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

  const clearAction = () => {
    setFilterInputs({
      genre: "",
      sort: "",
      country: "",
    });
    setAction({ type: "default", title: null, apiRoute: null, query: null });
  };

  useEffect(() => {
    const searchSpecificMovie = async () => {
      if (search === "") {
        clearAction();
      } else {
        const params = {
          type: "search",
          apiRoute: "/search/movie",
          query: `&query=${search}`,
          // response: search ?? null,
        };
        setAction(params);
      }
    };
    searchSpecificMovie();
  }, [search]);

  const defaultList = () => {
    return (
      <div className="flex flex-col gap-6 px-5">
        {newMovieslayout()}
        {popularMoviesLayout()}
      </div>
    );
  };

  const filterSectionLayout = () => {
    const sortByList = [
      { value: "popularity.desc", label: "Popularity" },
      // { value: "original_title.desc", label: "Date released" },
      { value: "vote_count.desc", label: "Rating" },
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
      <div className="md:bg-customGray/60 bg-black/80 p-2">
        <div className="flex flex-col gap-1 p-5 md:p-0">
          <button
            className="flex flex-row gap-1 items-center hover:text-white/80 text-white md:hidden "
            onClick={() => setShowFilter(false)}
          >
            <BiIcons.BsArrowLeft className="md:hidden flex justify-end " />
            <span className="text-xs ">Back</span>
          </button>
          <div className="flex  md:pt-0 pt-5">
            <div className=" text-white/80">Filters</div>
          </div>
          <div className="flex flex-col gap-1">
            <select
              className="px-2 focus:outline-none border border-customBlack rounded-md text-sm h-9 cursor-pointer"
              name="with_genres"
              value={filterInputs.genre}
              onChange={(e) => {
                setFilterInputs({ ...filterInputs, genre: e.target.value });
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
                className="px-2 focus:outline-none w-full border border-customBlack rounded-md text-sm h-9 cursor-pointer"
                value={filterInputs.sort}
                onChange={(e) => {
                  setFilterInputs({ ...filterInputs, sort: e.target.value });
                  storeFiltersData(2, "&sort_by=", e.target.value);
                }}
              >
                <option value="">Sort by</option>
                {sortByList.map(({ value, label }) => (
                  <option value={value}>{label}</option>
                ))}
              </select>
              <select
                className=" px-2 focus:outline-none w-full border border-customBlack rounded-md text-sm h-9 cursor-pointer"
                value={filterInputs.country}
                onChange={(e) => {
                  setFilterInputs({ ...filterInputs, country: e.target.value });
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
          <div className="flex flex-row gap-1 h-10 pt-2">
            <button
              className="border-blue-400  text-xs hover:bg-blue-400 hover:text-white border text-blue-400 p-1 cursor-pointer w-full text-center "
              onClick={() => performFilter()}
            >
              Filter
            </button>
            <button
              className="border-red-400 text-xs hover:bg-red-400 hover:text-white border  text-red-400 p-1 cursor-pointer w-full text-center "
              onClick={() => clearAction()}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    );
  };

  const performFilter = async () => {
    if (filter?.length > 0) {
      setShowFilter(false);
      const params = {
        type: "search",
        apiRoute: "/discover/movie",
        query: filter?.join("") ?? null,
      };
      return setAction(params);
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
      <div className="flex md:hidden flex-col px-5">
        <Carousel {...settings}>
          {trendingMovies?.slice(0, 5)?.map((data, index) => {
            const { title, original_name, backdrop_path, id } = data;
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
              </div>
            );
          })}
        </Carousel>
      </div>
    );
  };

  const filterBtn = () => {
    return (
      <div className="flex flex-row justify-between items-center md:hidden px-5">
        <div className="text-white text-lg font-medium">Today's Trending</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full  pb-5 bg-customBlack">
      <Navigation setSearch={setSearch} />
      {showFilter && (
        <div className="z-50 absolute top-0 left-0 h-full w-full flex justify-center items-center bg-black/40">
          <div className="fixed">{filterSectionLayout()}</div>
        </div>
      )}
      <div className={`flex flex-col gap-3`}>
        {!openMovie.isOpen ? (
          <div className="flex flex-row gap-2">
            <div className="md:basis-3/5 lg:basis-3/4 flex flex-col gap-2 md:gap-6">
              {/* {genreLayout()} */}
              {action.type !== "search" && filterBtn()}
              {action.type !== "search" && trendingMoviesMobileLayout()}
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
      <div className="flex fixed bottom-3 right-3 md:hidden z-40">
        <button
          className="flex flex-row gap-1 text-customBlack hover:text-customBlack/80 hover:bg-white/90  bg-white hover:px-5 p-2 rounded-full animate__animated animate__fadeInDown shadow-xl"
          onClick={() => setShowFilter(true)}
          onMouseEnter={() => {
            setHoverEffectFilter(true);
          }}
          onMouseLeave={() => {
            setHoverEffectFilter(false);
          }}
        >
          <BiIcons.BsFilter className="text-2xl " />
          {hoverEffectFilter && (
            <div className="animate__animated animate__bounceIn ">Filter</div>
          )}
        </button>
      </div>
    </div>
  );
}

export default MovieList;
