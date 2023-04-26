import React from "react";
import Navigation from "../Components/Navigation";
import ReactPlayer from "react-player";
import * as BiIcons from "react-icons/bs";

function MovieList() {
  const trailerList = [
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
    {
      title: "Fast X",
      url: "https://youtu.be/32RAq6JzY-w",
      release: "May 19, 2023",
      views: "37M",
    },
  ];

  const newTrailers = () => {
    return (
      <div className="flex flex-col gap-2">
        <div className="text-white text-lg font-medium">New Trailers</div>
        <div className="flex flex-col gap-3">
          {trailerList.map((data, index) => {
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
    );
  };

  const popularMovies = () => {
    const popularMovies = [
      {
        title: "Dog Gone",
        url: "https://youtu.be/q4rdxpc3wk0",
      },
      {
        title: "Chupa",
        url: "https://youtu.be/ViKnrHjzgn4",
      },
      {
        title: "Dear David",
        url: "https://youtu.be/RfwlJqZbaew",
      },
      {
        title: "We Have a Ghost",
        url: "https://youtu.be/82I1ErFD63U",
      },
    ];
    return (
      <div className="flex flex-col gap-2 bo">
        <div className="flex flex-row justify-between items-center">
          <div className="text-white text-lg font-medium">Popular Movies</div>
          <button className="text-white text-sm flex flex-row gap-1 items-center ">
            <span>All Movies</span> <BiIcons.BsChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-4 w-full gap-3">
          {popularMovies.map((data, index) => {
            const { title, url } = data ?? {};
            return (
              <div className=" flex flex-col gap-1" key={index}>
                <div className="h-full min-h-[20vh]">
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    url={url}
                    controls
                    light
                  />
                </div>
                <div className="font-light text-xs text-white">{title}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const trendingMovies = () => {
    const trendingMovies = [
      {
        title: "Murder Mystery 2",
        url: "https://youtu.be/LM2F56uK0fs",
      },
      {
        title: "Jung_E",
        url: "https://youtu.be/LCxnmfdxJ6s",
      },
    ];
    return (
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-row justify-between items-center">
          <div className="text-white text-lg font-medium">New Movies</div>
          <button className="text-white text-sm flex flex-row gap-1 items-center ">
            <span>All Movies</span> <BiIcons.BsChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-2 w-full gap-3">
          {trendingMovies.map((data, index) => {
            const { title, url } = data ?? {};
            return (
              <div className=" flex flex-col gap-1" key={index}>
                <div className="h-full min-h-[40vh]">
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    url={url}
                    controls
                    light
                  />
                </div>
                <div className="font-medium text-sm text-white">{title}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full bg-customBlack pb-5">
      <Navigation />
      <div className=" p-5 flex flex-col gap-3">
        <div className="bg-customGray/70 flex flex-row justify-between items-center  p-5 rounded-xl">
          <div className="flex flex-row gap-5 text-white">
            <div>Action</div>
            <div>Animation</div>
            <div>Fantasy</div>
            <div>Romance</div>
          </div>
          <div>
            <input
              type="text"
              placeholder="search..."
              className="focus:outline-none h-10 rounded-xl px-2 text-sm w-72"
            />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="basis-3/4 flex flex-col gap-6">
            {trendingMovies()}
            {popularMovies()}
          </div>
          <div className="basis-1/4 border-l border-gray-600 px-2">
            {newTrailers()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieList;
