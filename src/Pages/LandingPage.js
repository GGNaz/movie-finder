import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "react-carousel-minimal";
import * as RiIcons from "react-icons/ri";

function LandingPage() {
  const data = [
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
      caption: "San Francisco",
    },
    {
      image:
        "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
      caption: "Scotland",
    },
    {
      image:
        "https://static2.tripoto.com/media/filter/tst/img/735873/TripDocument/1537686560_1537686557954.jpg",
      caption: "Darjeeling",
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Palace_of_Fine_Arts_%2816794p%29.jpg/1200px-Palace_of_Fine_Arts_%2816794p%29.jpg",
      caption: "San Francisco",
    },
    {
      image:
        "https://i.natgeofe.com/n/f7732389-a045-402c-bf39-cb4eda39e786/scotland_travel_4x3.jpg",
      caption: "Scotland",
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

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };

  let topMovies = ["venom", "iron man", "batman", "superman"];
  const [topMovieList, setTopMovieList] = useState([]);
  console.log("topMovieList", topMovieList);

  useEffect(() => {
    const getMovieList = async () => {
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
    };

    getMovieList();
  }, [data]);
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
          <div className="flex flex-col z-50 h-full">
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
          </div>
          {/* <div className="flex justify-center h-full">
            <img src={topMovieList[number].image} className="w-full h-full" />
          </div> */}
          {/* <div className="flex flex-row gap-1 justify-center">
            {topMovieList.map((_id, index) => {
              return index !== number ? (
                <RiIcons.RiCheckboxBlankCircleLine className="text-customYellow" />
              ) : (
                <RiIcons.RiCheckboxBlankCircleFill className="text-customYellow" />
              );
            })}
            <div></div>
          </div> */}
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default LandingPage;
