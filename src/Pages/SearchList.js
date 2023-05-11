import { Player } from "@lottiefiles/react-lottie-player";
import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { portraitformat } from "../Assets/imagesformat";

function SearchList({ reponse, setIfPlayerOpen }) {
  const [openMovie, setOpenMovie] = useState({
    isOpen: false,
    movieDetails: {},
  });
  const getSelectedMovie = (details) => {
    setIfPlayerOpen(true);
    return setOpenMovie({ isOpen: true, movieDetails: details });
  };
  const closeVideoPlayer = () => {
    setIfPlayerOpen(false);
    return setOpenMovie({ isOpen: false, movieDetails: {} });
  };
  return (
    <div className="bg-customBlack ">
      {!openMovie.isOpen ? (
        <div className="flex flex-col gap-2 ">
          <div className="flex flex-row justify-between items-center">
            <div className="text-white text-lg font-medium">Results :</div>
          </div>
          {reponse?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 w-full  gap-3">
              {reponse.map((data, index) => {
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
