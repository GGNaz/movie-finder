import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "react-carousel-minimal";
import * as RiIcons from "react-icons/ri";

import * as BiIcons from "react-icons/bs";
import Navigation from "../Components/Navigation";

import LoginModal from "../Components/LoginModal";
import { popularMoviesStore } from "../Zustand/popularMoviesStore";
import { shallow } from "zustand/shallow";
import moment from "moment";
import { landscapeformat, portraitformat } from "../Assets/imagesformat";
import SearchList from "./SearchList";
import { getAPI } from "../API/apiRoutes";
import VideoPlayer from "./VideoPlayer";

function LandingPage() {
  const { movies } = popularMoviesStore((state) => state, shallow);
  const [search, setSearch] = useState("");
  const [ifPlayerOpen, setIfPlayerOpen] = useState(false);
  const [action, setAction] = useState({ type: "default", response: [] });
  const [number, setNumber] = useState(0);
  const [openMovie, setOpenMovie] = useState({
    isOpen: false,
    movieDetails: {},
  });
  useEffect(() => {
    let ctr = 0;
    setInterval(() => {
      if (ctr === 5) {
        ctr = 0;

        return setNumber(ctr);
      } else {
        ctr = ctr + 1;

        return setNumber(ctr);
      }

      // }
    }, 4000);
  }, []);

  const getSelectedMovie = (details) => {
    // setIfPlayerOpen(true);
    return setOpenMovie({ isOpen: true, movieDetails: details });
  };

  const actionChecker = () => {
    switch (action?.type) {
      case "default":
        return defaultLandingPage();
      case "popular":
        return <div>popular</div>;
      case "search":
        return (
          <div className="bg-customBlack pt-20 p-5 h-screen w-full">
            <SearchList
              reponse={action?.response}
              setIfPlayerOpen={setIfPlayerOpen}
            />
          </div>
        );

      // return <div>asdasd</div>;
    }
  };

  const defaultLandingPage = () => {
    return (
      <div className="flex h-screen w-full bg-gradient-to-tr from-customBlack via-customBlack/80 to-customBlack/5 absolute z-20">
        <div className="flex flex-col  w-full">
          <div className="flex fex-col h-screen p-5 z-20 md:z-0  relative items-end md:items-center">
            <div className="flex flex-col justify-start w-full md:basis-4/5 lg:basis-3/5">
              {/* <div className=" flex flex-row absolute bottom-2 left-0 w-full  px-2"> */}
              <div className=" flex flex-col ">
                <div className="flex flex-col gap-5">
                  <div className="text-white/80  font-extrabold text-5xl md:text-6xl h-full md:h-[20vh]">
                    {movies[number]?.title}
                  </div>

                  <div className="text-white/90 flex flex-row gap-5">
                    Release Date:{" "}
                    <span className="text-customGray">
                      {moment(movies[number]?.release_date).format("LL")}
                    </span>
                    <div className="flex flex-row gap-1 items-center text-customYellow">
                      <BiIcons.BsFillStarFill />
                      <span>{movies[number]?.vote_average?.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 md:hidden ">
                    <div className="text-white/80">Cast:</div>
                    <div className="grid grid-cols-4 w-full ">
                      {movies[number]?.cast
                        ?.slice(0, 4)
                        ?.map(({ name, profile_path, id }) => {
                          return (
                            <div
                              key={id}
                              className="flex flex-col items-center justify-center transform hover:scale-110 origin-center transition duration-300 ease-in-out cursor-pointer"
                            >
                              <img
                                src={`${portraitformat}${profile_path}`}
                                className="h-12 w-12 rounded-full"
                              />
                              <div className="text-white/80 text-xs">
                                {name}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="flex flex-row gap-3  md:h-fit">
                    <button
                      className="flex flex-row  w-full md:w-fit items-center px-5 py-1 text-white rounded-lg bg-customRed hover:bg-customRed/80"
                      onClick={() => getSelectedMovie(movies[number])}
                    >
                      <BiIcons.BsPlayFill className="h-6 w-6" />
                      <span>Play now</span>
                    </button>
                    <button className="flex flex-row  w-full md:w-fit items-center px-5 py-1 text-white/90 hover:bg-white/10 rounded-lg border-2 border-white/80 ">
                      <BiIcons.BsPlus className="h-6 w-6" />
                      <span>Watch List</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
          <div className="md:flex gap-1 flex-col  hidden  p-5 z-20">
            <div className="text-white/90 font-medium text-lg">
              Top picks for you
            </div>
            <div className="flex flex-row gap-2 lg:gap-5 items-center h-[25vh] lg:h-[30vh] overflow-hidden ">
              {movies.map(({ poster_path, id }, index) => (
                <div key={id} className=" h-full w-full  ">
                  <img
                    src={`${portraitformat}${poster_path}`}
                    alt={poster_path}
                    className="h-full w-full rounded-md shadow-sm transform hover:scale-110 origin-center transition duration-300 ease-in-out cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute z-10 bottom-0 left-0 w-full h-[62vh] md:h-[35vh] blur-sm bg-gradient-to-t from-black via-black to-black/5" />
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
  const closeVideoPlayer = () => {
    // setIfPlayerOpen(false);
    return setOpenMovie({ isOpen: false, movieDetails: {} });
  };
  return (
    <>
      {!openMovie.isOpen ? (
        <div
          className="h-screen w-full "

          // style={{
          //   backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movies[number]?.poster_path}) `,
          // }}
        >
          {search === "" && movies[number]?.backdrop_path && (
            <img
              src={`${landscapeformat}${movies[number]?.backdrop_path}`}
              className={`absolute top-0 left-0 -z-10 h-[70vh] md:h-full w-full bg-cover `}
              alt="bgcover"
              loading="lazy"
            />
          )}
          <div className="absolute top-0 left-0 w-full">
            <Navigation setSearch={setSearch} />
          </div>
          {actionChecker()}
        </div>
      ) : (
        <VideoPlayer
          closeVideoPlayer={closeVideoPlayer}
          details={openMovie?.movieDetails ?? {}}
        />
      )}
    </>
  );
}

export default LandingPage;
