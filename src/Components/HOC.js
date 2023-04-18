import React from "react";
import logo from "../Assets/logo.png";

function HOC() {
  return (
    <div className="h-screen flex justify-center items-center w-full bg-customBlack">
      <img src={logo} alt="logo" className="h-32 w-32" />
    </div>
  );
}

export default HOC;
