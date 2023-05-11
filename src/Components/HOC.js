import React, { useState } from "react";
import logo from "../Assets/netflixlogo.png";
import { Player } from "@lottiefiles/react-lottie-player";
import axios from "axios";

const hocLoading = (WrappedComponent) => (props) => {
  const [show, setShow] = useState(false);

  axios.interceptors.request.use(
    function (config) {
      setShow(true);
      return config;
    },
    function (error) {
      setShow(false);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      setShow(false);
      return response;
    },
    function (error) {
      setShow(false);
      return Promise.reject(error);
    }
  );

  return (
    <>
      {show ? (
        <div className="h-screen bg-cover absolute top-0 left-0 flex justify-center z-50 items-center w-full bg-customBlack flex-col gap-1">
          <img
            src={logo}
            alt="logo"
            className="h-[20vh] w-[40vw] md:w-[30vw] "
          />
          <Player
            src="https://assets6.lottiefiles.com/private_files/lf30_06kvvo5n.json"
            loop
            className="h-20 w-20"
            autoplay
            // key={id}
          />
        </div>
      ) : null}

      <WrappedComponent {...props} />
    </>
  );
};

export default hocLoading;
