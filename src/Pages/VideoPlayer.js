import React from "react";
import * as BiIcons from "react-icons/bs";
function VideoPlayer({ details }) {
  const { backdrop_path, poster_path, title, overview } = details ?? {};
  return (
    <div className="w-full border-white bg-customBlack absolute top-0 left-0 z-50 h-screen">
      <div className="w-full flex justify-end">
        <img
          src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${backdrop_path}`}
          className=" h-screen w-[70vw] z-20"
        />
      </div>
      <div className="flex h-screen w-full bg-gradient-to-r from-customBlack via-customBlack/90 to-customBlack/5 absolute top-0 left-0 z-30">
        <div className="p-10 flex basis-3/5">
          <div className="flex flex-col gap-5">
            <div>
              <button className="flex flex-row gap-2 text-white items-center">
                <BiIcons.BsArrowLeft />
                <span>Back to Movie list</span>
              </button>
            </div>

            <div className="flex flex-row gap-3">
              <img
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}`}
                className="h-[50vh] "
              />
              <div className="flex flex-col gap-2">
                <div className="text-4xl text-white font-semibold">{title}</div>
                <div className="text-white text-justify text-sm">
                  {overview}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
