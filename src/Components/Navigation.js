import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png";
import * as BiIcons from "react-icons/bs";
function Navigation() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row w-full justify-between items-center z-50 h-20">
      <div className="flex flex-row justify-center gap-4 text-white items-center cursor-pointer">
        <img src={logo} className="h-16 w-12" alt="logo" />
        {/* <div>TOP CAST</div>
                  <div>PHOTOS</div> */}
        <div onClick={() => navigate("/")}>HOME</div>
        <div onClick={() => navigate("/movies")}>MOVIES</div>
      </div>
      <div className="p-4 text-white">
        <button className="flex flex-row gap-1 px-2 justify-center items-center bg-customBlack/70 text-white py-1 rounded-lg text-sm">
          <BiIcons.BsFillPersonFill size={18} />
          <div>Sign up</div>
        </button>
      </div>
    </div>
  );
}

export default Navigation;
