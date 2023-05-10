import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useRef, useState } from "react";
import { findDOMNode } from "react-dom";
import * as BiIcons from "react-icons/bs";
import ReactPlayer from "react-player";

import screenfull from "screenfull";
import { getAPI } from "../API/apiRoutes";
function VideoPlayer({ details, closeVideoPlayer }) {
  const {
    backdrop_path,
    poster_path,
    title,
    overview,
    id,
    release_date,
    popularity,
    vote_average,
    vote_count,
  } = details ?? {};
  const [video, setVideo] = useState({ isOpen: false, data: {} });
  console.log("video", video);

  console.log("details", details);
  const playVideo = async () => {
    await getAPI(`/movie/${id}/videos`, `&language=en-US`).then(
      ({ data, status }) => {
        if (status === 200) {
          setVideo({
            isOpen: true,
            data: data?.results[data?.results.length - 1] ?? {},
          });
          // if (screenfull.isEnabled) {
          //   screenfull.request(player.current.wrapper);
          // }

          // return handleClickFullscreen();
          // handleFullScreenClick();
        }
      }
    );
  };

  const closeVideo = () => {
    return setVideo({ isOpen: false, data: {} });
  };

  return (
    <div className="absolute top-0 left-0 flex flex-col h-screen z-50 w-full overflow-hidden">
      {video.isOpen && (
        <div className="flex justify-center items-center w-full h-screen absolute z-50">
          <div className="flex flex-col gap-1 w-full max-w-4xl bg-black p-5 pb-5 rounded-sm shadow-lg ">
            <div className="flex flex-row justify-between text-white items-center px-1">
              <div>
                Now Playing - {title} ({release_date?.split("-")[0]})
              </div>
              <button onClick={() => closeVideo()}>
                <BiIcons.BsX className="h-7 w-7" />
              </button>
            </div>
            <ReactPlayer
              playing={true}
              width="100%"
              height="70vh"
              url={`https://youtu.be/${video.data.key}`}
              controls

              // light
            />
          </div>

          {/* <button onClick={handleClickFullscreen}>Fullscreen</button> */}
        </div>
      )}

      <div
        className={`w-[105vw] -ml-2 border-white bg-customBlack absolute top-0 left-0 z-40 h-[105vh]  ${
          video.isOpen ? "blur-sm" : "blur-none"
        }`}
      >
        <div className=" flex w-full">
          <div className="flex  relative justify-end w-full  ">
            <div className="flex  w-full md:w-[90vw] lg:w-[80vw] relative animate__animated animate__fadeInLeft">
              <img
                src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${backdrop_path}`}
                className="h-[40vh] md:h-screen z-20 w-full"
              />
              <div className="absolute  inset-0 bg-gradient-to-t md:bg-gradient-to-r from-customBlack via-customBlack/80 to-customBlack/5 w-full md:w-[10vw] z-20"></div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden animate__animated animate__fadeInLeft animate__delay-0.999s flex h-screen w-full bg-none md:bg-gradient-to-r from-customBlack via-customBlack/90 to-customBlack/5 absolute top-0 left-0 z-30">
          <div className="p-10 flex flex-col gap-5 w-full md:w-basis-4/5 lg:basis-3/5">
            <div className="flex flex-col gap-20 md:gap-5">
              <div>
                <button
                  className="flex flex-row gap-2 text-customGray hover:text-white items-center "
                  onClick={() => closeVideoPlayer()}
                >
                  <BiIcons.BsArrowLeft />
                  <span>Back to Movie list</span>
                </button>
              </div>

              <div className="flex flex-row gap-3">
                <img
                  src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}`}
                  className="h-[50vh] hidden md:flex "
                />
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="text-4xl text-white font-semibold">
                      {title}
                    </div>
                    <div className="text-white  text-sm  ">{overview}</div>
                  </div>
                  <div className="flex flex-row gap-3">
                    <button
                      className="flex flex-row  items-center px-5 py-1 text-white rounded-lg bg-customRed hover:bg-customRed/80"
                      onClick={() => playVideo()}
                    >
                      <BiIcons.BsPlayFill className="h-6 w-6" />
                      <span>Play</span>
                    </button>
                    <button className="flex flex-row  items-center px-5 py-1 text-white rounded-lg bg-customGray hover:bg-customGray/80">
                      <BiIcons.BsPlus className="h-6 w-6" />
                      <span>Watch List</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1 ">
                <div className="text-md text-white">Release Date</div>
                <div className=" flex flex-row gap-1  text-customGray text-xl">
                  <BiIcons.BsCalendarMonthFill />
                  <span>{moment(release_date)?.format("LL")}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 ">
                <div className="text-md text-white">Rating</div>
                <div className=" flex flex-row gap-1  text-customGray text-xl">
                  <BiIcons.BsFillStarFill />
                  <span>{vote_average?.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 ">
                <div className="text-md text-white">Popularity</div>
                <div className="text-customGray text-xl flex flex-row gap-1 items-center">
                  <BiIcons.BsFillPeopleFill />
                  <span>{popularity?.toFixed(0)}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 ">
                <div className="text-md text-white">Total Votes</div>
                <div className="text-customGray text-xl flex flex-row gap-1 items-center">
                  <BiIcons.BsFillHeartFill /> <span>{vote_count}</span>
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
