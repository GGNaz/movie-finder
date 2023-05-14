import { Player } from "@lottiefiles/react-lottie-player";
import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { portraitformat } from "../Assets/imagesformat";
import * as BiIcons from "react-icons/bs";
import { useEffect } from "react";
import { getAPI } from "../API/apiRoutes";

function SearchList({ apiRoute, title, query, setIfPlayerOpen }) {
  const [openMovie, setOpenMovie] = useState({
    isOpen: false,
    movieDetails: {},
  });
  const [pageCounter, setPageCounter] = useState(1);
  const [results, setResults] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const isTop = window.pageYOffset > 0;
    setIsVisible(isTop);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getSelectedMovie = (details) => {
    setIfPlayerOpen(true);
    return setOpenMovie({ isOpen: true, movieDetails: details });
  };
  const closeVideoPlayer = () => {
    setIfPlayerOpen(false);
    return setOpenMovie({ isOpen: false, movieDetails: {} });
  };
  useEffect(() => {
    const pageNoApi = async () => {
      if (pageCounter >= 1) {
        await getAPI(apiRoute, `${query}&page=${pageCounter}`).then(
          ({ data, status }) => {
            if (status === 200) {
              setResults(data?.results ?? []);
            }
          }
        );
      }
    };
    console.log(
      "🚀 ~ file: SearchList.js:38 ~ pageNoApi ~ pageNoApi:",
      pageNoApi
    );
    pageNoApi();
  }, [pageCounter, apiRoute, query]);

  const incrementPageNo = () => {
    if (pageCounter >= 1) {
      setPageCounter((prev) => prev + 1);
      return scrollToTop();
    }
  };

  const decrementPageNo = () => {
    if (pageCounter > 1) {
      setPageCounter((prev) => prev - 1);
      return scrollToTop();
    }
  };

  return (
    <div className="bg-customBlack px-5">
      {!openMovie.isOpen ? (
        <div className="flex flex-col gap-2 ">
          <div className="flex flex-row justify-between items-center">
            <div className="text-white text-lg font-medium">
              {title ?? "Results :"}
            </div>
          </div>
          {results?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 w-full  gap-3">
              {results.map((data, index) => {
                const { poster_path, original_title, id, release_date } =
                  data ?? {};
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
                      <img
                        src={
                          poster_path
                            ? `${portraitformat}${poster_path}`
                            : "https://img.freepik.com/free-vector/funny-error-404-background-design_1167-219.jpg?w=2000"
                        }
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
                      {original_title}{" "}
                      {release_date && `(${release_date?.split("-")[0]})`}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-[70vh] w-full flex justify-center items-center ">
              <div className="flex flex-col gap-1 justify-center items-center">
                <Player
                  src="https://assets5.lottiefiles.com/packages/lf20_j815nGlVox.json"
                  loop
                  className="h-32 w-32"
                  autoplay
                />
                <div className="text-white/70">Empty result</div>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-1 justify-center items-center pt-2">
            <div className="text-xs text-white/80">Pages</div>
            <div className="flex flex-row gap-1  items-center">
              <BiIcons.BsCaretLeft
                className="hover:text-customYellow text-white/80 cursor-pointer text-lg"
                onClick={() => decrementPageNo()}
              />{" "}
              <span className="px-2 bg-white text-customBlack font-semibold rounded-md ">
                {pageCounter}
              </span>{" "}
              <BiIcons.BsCaretRight
                className="hover:text-customYellow text-white/80 cursor-pointer text-lg"
                onClick={() => incrementPageNo()}
              />
            </div>
          </div>
        </div>
      ) : (
        <VideoPlayer
          closeVideoPlayer={closeVideoPlayer}
          details={openMovie?.movieDetails ?? {}}
        />
      )}
    </div>
  );
}

export default SearchList;
