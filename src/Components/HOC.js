import React from "react";
import logo from "../Assets/netflixlogo.png";
import { Player } from "@lottiefiles/react-lottie-player";

function HOC() {
  return (
    <div className="h-screen flex justify-center items-center w-full bg-customBlack z-50 flex-col gap-1">
      <img src={logo} alt="logo" className="h-[20vh] w-[30vw] " />
      <Player
        src="https://assets6.lottiefiles.com/private_files/lf30_06kvvo5n.json"
        loop
        className="h-20 w-20"
        autoplay
        // key={id}
      />
    </div>
  );
}

export default HOC;
