import React from "react";
import Navigation from "../Components/Navigation";
import ReactPlayer from "react-player";
import * as BiIcons from "react-icons/bs";

function MovieList() {
  const trendingList = [
    {
      title: "Blue Beetle",
      url: "https://youtu.be/vS3_72Gb-bI",
      release: "August 18, 2023",
      views: "19M",
    },
    {
      title: "Black Panther: Wakanda Foreve",
      url: "https://youtu.be/_Z3QKkl1WyM",
      release: "November 11, 2022",
      views: "42M",
    },
  ];
  return (
    <div className="flex flex-col w-full">
      <Navigation />
      <div className=" p-5 flex flex-col">
        <div className="bg-customGray/70 flex flex-row justify-between items-center  p-5 rounded-xl">
          <div className="flex flex-row gap-5 text-white">
            <div>Action</div>
            <div>Horror</div>
            <div>Fantasy</div>
            <div>Sci-fi</div>
          </div>
          <div>
            <input
              type="text"
              placeholder="search..."
              className="focus:outline-none h-10 rounded-xl px-2 text-sm w-72"
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="basis-3/4 "></div>
          <div className="basis-1/4 border-l border-gray-800 p-2">
            <div className="flex flex-col gap-2">
              <div className="text-white text-lg font-medium">New Trailers</div>
              <div className="flex flex-col gap-3">
                {trendingList.map((data, index) => {
                  const { title, release, views, url } = data;
                  return (
                    <div className="flex flex-col gap-1" key={index}>
                      <div className=" h-48">
                        <ReactPlayer
                          width="100%"
                          height="100%"
                          url={url}
                          controls
                          light
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-white text-sm flex flex-row justify-between">
                          <div>{title}</div>
                          <div className="flex flex-row gap-1 items-center">
                            <BiIcons.BsEye size={18} />
                            <span>{views}</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          Release On {release}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieList;
