import React from "react";
import logo from "../Assets/netflixwallpaper.png";

function HOC() {
  return (
    // <div className="h-screen flex justify-center items-center w-full bg-customBlack">
    <img src={logo} alt="logo" className="h-screen w-full bg-cover" />
    // </div>
  );
}

export default HOC;
