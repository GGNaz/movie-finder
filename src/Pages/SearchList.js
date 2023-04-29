import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import VideoPlayer from "./VideoPlayer";

function SearchList({ reponse }) {
  return (
    <div>
      <VideoPlayer details={reponse[0] ?? {}} />
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-row justify-between items-center">
          <div className="text-white text-lg font-medium">Search results :</div>
        </div>

        <div className="grid grid-cols-4 w-full  gap-3">
          {reponse.map((data, index) => {
            const { poster_path, original_title, id, release_date } =
              data ?? {};
            return (
              <div
                className=" flex flex-col gap-1 h-full min-h-[20vh] cursor-pointer"
                key={index}
                // onClick={() => watchTrailer(id)}
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
                        ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}`
                        : "https://img.freepik.com/free-vector/funny-error-404-background-design_1167-219.jpg?w=2000"
                    }
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
    </div>
  );
}

export default SearchList;
