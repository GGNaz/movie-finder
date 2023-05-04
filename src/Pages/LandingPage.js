import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "react-carousel-minimal";
import * as RiIcons from "react-icons/ri";

import * as BiIcons from "react-icons/bs";
import Navigation from "../Components/Navigation";
import HOC from "../Components/HOC";
import LoginModal from "../Components/LoginModal";
import { popularMoviesStore } from "../Zustand/popularMoviesStore";
import { shallow } from "zustand/shallow";
import moment from "moment";

function LandingPage() {
  const { movies } = popularMoviesStore((state) => state, shallow);
  console.log("moviemoviemovie", movies);
  const topmovies = [
    "Spider-Man: No Way Home",
    "Venom: Let There Be Carnage",
    "Pokémon Detective Pikachu",
    "John Wick Chapter 4",
    "Shazam! Fury of the Gods",
    "Black Adam",
  ];
  const data = [
    {
      image:
        "https://c4.wallpaperflare.com/wallpaper/857/67/782/spider-man-homecoming-2017-wallpaper-preview.jpg",
      caption: "Spider-Man: No Way Home",
      rating: 8.2,
      genre: "Action | Adventure | Fantasy",
    },
    {
      image:
        "https://w0.peakpx.com/wallpaper/175/33/HD-wallpaper-movie-venom-let-there-be-carnage.jpg",
      caption: "Venom: Let There Be Carnage",
      rating: 5.9,
      genre: "Action | Sci-Fi | Thriller",
    },
    {
      image:
        "https://c4.wallpaperflare.com/wallpaper/999/730/463/yellow-fiction-cap-pikachu-detective-hd-wallpaper-preview.jpg",
      caption: "Pokémon Detective Pikachu",
      rating: 6.5,
      genre: "Action | Adventure | Comedy",
    },
    {
      image:
        "https://c4.wallpaperflare.com/wallpaper/478/888/1024/keanu-reeves-john-wick-gun-movies-wallpaper-preview.jpg",
      caption: "John Wick Chapter 4",
      rating: 8.3,
      genre: "Action | Crime | Thriller",
    },
    {
      image:
        "https://w0.peakpx.com/wallpaper/81/5/HD-wallpaper-shazam-movie-poster-2023.jpg",
      caption: "Shazam! Fury of the Gods",
      rating: 6.7,
      genre: "Action | Adventure | Comedy",
    },

    {
      image:
        "https://w0.peakpx.com/wallpaper/932/402/HD-wallpaper-black-adam-2022-black-adam-superheroes-movies-2022-movies.jpg",
      caption: "Black Adam",
      rating: 6.3,
      genre: "Action | Adventure | Fantasy",
    },
  ];

  const [topMovieList, setTopMovieList] = useState([]);
  const [number, setNumber] = useState(0);

  console.log("number", number);

  console.log("topMovieList", topMovieList);

  const getMovieList = async () => {
    await axios
      .all(
        topmovies.map((apiRoute) =>
          axios
            .get(`https://www.omdbapi.com/?t=${apiRoute}&apikey=bfa46097`)
            .then((res) => res.data)
        )
      )
      .then((res) => {
        if (res?.length > 0) {
          let storeMovie = [];
          res.map((data) => {
            storeMovie.push(data);
          });
          setTimeout(() => {
            return setTopMovieList(storeMovie);
          }, 2000);
        }
      });
  };

  useEffect(() => {
    // const getMovieList = async () => {
    // await axios
    //   .all(
    //     topMovies.map((apiRoute) =>
    //       axios
    //         .get(`http://www.omdbapi.com/?t=${apiRoute}&apikey=bfa46097`)
    //         .then((res) => res.data)
    //     )
    //   )
    //   .then((res) => {
    //     if (res?.length > 0) {
    //       let storeMovie = [];
    //       res.map((data) => {
    //         const params = {
    //           ...data,
    //           image: data.Poster,
    //           caption: data.Title,
    //         };
    //         storeMovie.push(params);
    //       });
    //       return setTopMovieList(storeMovie);
    //     }
    //   });
    // .get(``)

    getMovieList();
    // };
  }, []);

  // const fetchingMovies = async () => {
  //   let page = 1;
  //   await axios
  //     .get(
  //       `http://www.omdbapi.com/?apikey=bfa46097&type=movie&plot=short&r=json&v=1&i=bfa46097`
  //     )
  //     .then((res) => console.log("res", res));
  // };
  // useEffect(() => {
  //   fetchingMovies();
  // }, []);

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

  return (
    <div
      className="h-screen w-full "
      // style={{
      //   backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movies[number]?.poster_path}) `,
      // }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movies[number]?.backdrop_path}`}
        className={`absolute top-0 left-0 -z-10 h-[70vh] md:h-full w-full bg-cover `}
        alt="bgcover"
      />

      {/* <div className="h-screen w-full z-20 absolute top-0 left-0 blur-sm" /> */}
      {/* bg-gradient-to-tr from-customBlack via-customBlack/70 to-customBlack/5 */}
      {topMovieList?.length > 0 ? (
        <div className="flex h-screen w-full bg-gradient-to-tr from-customBlack via-customBlack/80 to-customBlack/5 absolute z-20">
          <div className="flex flex-col z-50 w-full">
            <div className="w-full">
              <Navigation />
            </div>
            {/* <div className="flex w-full basis-1/5 p-5 md:p-10">
              
            </div> */}
            <div className="flex fex-col h-screen p-5 z-20 md:z-0  relative items-end md:items-center">
              <div className="flex flex-col justify-start w-full md:basis-2/4">
                {/* <div className=" flex flex-row absolute bottom-2 left-0 w-full  px-2"> */}
                <div className=" flex flex-col ">
                  <div className="flex flex-col gap-5">
                    <div className="text-white/80  font-extrabold text-5xl md:text-6xl h-full md:h-[20vh]">
                      {movies[number]?.title}
                    </div>

                    <div className="text-white/90 flex flex-row gap-5">
                      Release Date:{" "}
                      <span className="text-customGray">
                        {moment(movies[number].release_date).format("LL")}
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
                          ?.map(({ name, profile_path }) => {
                            return (
                              <div className="flex flex-col items-center justify-center transform hover:scale-110 origin-center transition duration-300 ease-in-out cursor-pointer">
                                <img
                                  src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${profile_path}`}
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
                    <div className="flex flex-row gap-3 h-[6vh] md:h-fit">
                      <button
                        className="flex flex-row  w-full md:w-fit items-center px-5 py-1 text-white rounded-lg bg-customRed hover:bg-customRed/80"
                        // onClick={() => playVideo()}
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
                Continue watching
              </div>
              <div className="flex flex-row gap-2 lg:gap-5 items-center h-[25vh] lg:h-[30vh] overflow-hidden ">
                {movies.map(({ poster_path, id }, index) => (
                  <div key={id} className=" h-full w-full  ">
                    <img
                      src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}`}
                      alt={poster_path}
                      className="h-full w-full rounded-md shadow-sm transform hover:scale-110 origin-center transition duration-300 ease-in-out cursor-pointer"
                      // className={`w-full ${
                      //   index !== number
                      //     ? "h-28 w-28 md:w-80"
                      //     : "h-40 w-40 md:w-96 "
                      // }  hover:transition duration-700 ease-in-out`}
                    />

                    {/* <div className="group/edit hover:bg-customBlack/50 h-full  w-full absolute top-0 left-0 z-10" /> */}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute z-10 bottom-0 left-0 w-full h-[62vh] md:h-[35vh] blur-sm bg-gradient-to-t from-black via-black to-black/5" />
          </div>
          {/* <div className="flex flex-col z-50 h-full">
            <div className="basis-2/5 p-5 w-full  flex  justify-center items-center">
              <div className="text-5xl font-bold text-customYellow">
                {topMovieList[number]?.caption}
              </div>
            </div>
            <div className="basis-3/5 flex  justify-center items-center">
              <div>
                leronasdasdleronasdasdleronasdasdleronasdasdleronasdasdleronasdasd
              </div>
            </div>
          </div> */}
          {/* <div className="flex justify-center h-full">
            <img src={topMovieList[number].image} className="w-full h-full" />
          </div> */}
          {/* <div className="flex flex-row gap-1 justify-center">
            
            <div></div>
          </div> */}
          {/* <div className="flex flex-row absolute justify-center w-full gap-2 bottom-2 z-50">
            {topMovieList.map((_id, index) => {
              return index !== number ? (
                <RiIcons.RiCheckboxBlankCircleLine className="text-white" />
              ) : (
                <RiIcons.RiCheckboxBlankCircleFill className="text-customYellow" />
              );
            })}
          </div> */}
        </div>
      ) : (
        <div className=" z-50">
          <HOC />
        </div>
      )}
    </div>
  );
}

export default LandingPage;
