import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "react-carousel-minimal";
import * as RiIcons from "react-icons/ri";

import * as BiIcons from "react-icons/bs";
import Navigation from "../Components/Navigation";
import HOC from "../Components/HOC";
import LoginModal from "../Components/LoginModal";

function LandingPage() {
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
    }, 3000);
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${data[number]?.image}) `,
      }}
    >
      <div className="" />
      {topMovieList?.length > 0 ? (
        <div className="flex h-screen w-full bg-gradient-to-tr from-customBlack via-customBlack/70 to-customBlack/5 absolute z-20">
          <div className="flex flex-col z-50 w-full">
            <div className="basis-4/5">
              <Navigation />
            </div>
            <div className="flex w-full basis-1/5 p-5 md:p-10">
              <div className="flex flex-col gap-2">
                <div className="text-customRed font-extrabold text-3xl md:text-6xl">
                  {topMovieList[number]?.Title}
                </div>
                <div className="flex flex-row gap-5 items-center text-white">
                  <div>
                    {topMovieList[number]?.Genre.split(",").map(
                      (data, index) => `${data} ${index < 2 ? " | " : ""}`
                    )}
                  </div>
                  <div className="flex flex-row gap-1  items-center text-customYellow">
                    <div>
                      <BiIcons.BsFillStarFill />
                    </div>
                    <div>{topMovieList[number]?.imdbRating}</div>
                  </div>
                </div>
                <div className="text-white">{topMovieList[number]?.Plot}</div>
              </div>
            </div>
            <div className="md:flex hidden">
              <div className="flex flex-row gap-5 p-5 items-center h-[20vh] bg-customBlack/30 overflow-hidden">
                {data.map(({ image }, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={image}
                      className={`w-full ${
                        index !== number
                          ? "h-28 w-28 md:w-80"
                          : "h-40 w-40 md:w-96 "
                      }  hover:transition duration-700 ease-in-out`}
                    />
                  </div>
                ))}
              </div>
            </div>
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
