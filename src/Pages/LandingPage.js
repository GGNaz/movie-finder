import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "react-carousel-minimal";
import * as RiIcons from "react-icons/ri";
import logo from "../Assets/logo.png"

function LandingPage() {
  const data = [
    {
      image:
        "https://c4.wallpaperflare.com/wallpaper/857/67/782/spider-man-homecoming-2017-wallpaper-preview.jpg",
      caption: "Spiderman",
    },
    {
      image:
        "https://c4.wallpaperflare.com/wallpaper/232/717/114/venom-movie-venom-superheroes-hd-wallpaper-preview.jpg",
      caption: "Venom",
    },
    {
      image:
        "https://c4.wallpaperflare.com/wallpaper/999/730/463/yellow-fiction-cap-pikachu-detective-hd-wallpaper-preview.jpg",
      caption: "Pokémon Detective Pikachu",
    },
    {
      image:
        "https://c4.wallpaperflare.com/wallpaper/478/888/1024/keanu-reeves-john-wick-gun-movies-wallpaper-preview.jpg",
      caption: "John Wick",
    },
    {
      image:
        "https://wallpapercave.com/dwp1x/wp1945913.jpg",
      caption: "Sherlock Holmes",
    },
    {
      image:
        "https://www.tusktravel.com/blog/wp-content/uploads/2020/07/Best-Time-to-Visit-Darjeeling-for-Honeymoon.jpg",
      caption: "Darjeeling",
    },
    {
      image:
        "https://www.omm.com/~/media/images/site/locations/san_francisco_780x520px.ashx",
      caption: "San Francisco",
    },
    {
      image:
        "https://images.ctfassets.net/bth3mlrehms2/6Ypj2Qd3m3jQk6ygmpsNAM/61d2f8cb9f939beed918971b9bc59bcd/Scotland.jpg?w=750&h=422&fl=progressive&q=50&fm=jpg",
      caption: "Scotland",
    },
    {
      image:
        "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/summer-7.jpg",
      caption: "Darjeeling",
    },
  ];


  const [topMovieList, setTopMovieList] = useState([]);
  console.log("topMovieList", topMovieList);

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

      setTopMovieList(data);
    // };


  }, []);
  const [number, setNumber] = useState(0);
  console.log("number", number);

  useEffect(() => {
    let ctr = 0;
    setInterval(() => {
      // if (topMovieList?.length) {
      if (ctr === 8) {
        ctr = 0;
        // console.log("ctr", ctr);
        return setNumber(ctr);
      } else {
        ctr = ctr + 1;
        // console.log("ctr", ctr);
        return setNumber(ctr);
      }
      // console.log("ctr", ctr);
      // }
    }, 3000);
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${topMovieList[number]?.image}) `,
      }}
    >
      <div className="h-screen w-full bg-gradient-to-tr from-customBlack via-customBlack/80 to-customBlack/30 absolute z-20" />
      {topMovieList?.length > 0 ? (
        // <Carousel
        //   data={topMovieList}
        //   time={2000}
        //   // width="850px"
        //   // height="500px"
        //   captionStyle={captionStyle}
        //   radius="10px"
        //   slideNumber={true}
        //   slideNumberStyle={slideNumberStyle}
        //   captionPosition="bottom"
        //   automatic={true}
        //   dots={true}
        //   pauseIconColor="white"
        //   pauseIconSize="40px"
        //   slideBackgroundColor="darkgrey"
        //   slideImageFit="cover"
        //   thumbnails={true}
        //   thumbnailWidth="100px"
        //   // style={{
        //   //   textAlign: "center",
        //   //   maxWidth: "850px",
        //   //   maxHeight: "500px",
        //   //   margin: "40px auto",
        //   // }}
        //   className="w-full h-screen"
        // />
        <div className="flex h-screen ">
          <div className="flex flex-col z-50 w-full">

          <div className="basis-3/5">
          <div className="flex flex-row w-full justify-between z-50 h-20">
            <div className="flex flex-row justify-center gap-4 text-white items-center">
              <img src={logo} className="h-16 w-12" alt="logo" />
              <div>TOP CAST</div>
              <div>PHOTOS</div>
              <div>VIDEOS</div>
              <div>SIMILAR MOVIES</div>
              </div>
              <div className="flex flex-row gap-2 px-4 justify-center items-center text-white">
                <div>Login</div>
                <div>/</div>
                <div>Sign in</div>
              </div>
          </div>
          </div>
          <div className="basis-2/5  px-10">
            <div className="flex">
              <div className="basis-2/4 flex flex-col gap-2">
              <div className="text-[#B1060F] font-extrabold text-6xl">
              {topMovieList[number]?.caption}
              </div>
              <div className="flex flex-row justify-between">
              <div className="text-white flex flex-row gap-1 items-center"><RiIcons.RiStarFill className="text-customYellow" /><span>8.9</span> <div>| 5,324</div> </div>
              <div className="text-white flex flex-row gap-1"><span>2h 35m</span> <li/> <div>Action, Adventure, Drama</div>  <li/> <span>2021</span></div>
              </div>
              </div>
              <div className="basis-2/4">

              </div>
            
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
          <div className="flex flex-row absolute justify-center w-full gap-2 bottom-2 z-50">
          {topMovieList.map((_id, index) => {
              return index !== number ? (
                <RiIcons.RiCheckboxBlankCircleLine className="text-white" />
              ) : (
                <RiIcons.RiCheckboxBlankCircleFill className="text-customYellow" />
              );
            })}
          </div>
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default LandingPage;
