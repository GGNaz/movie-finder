import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../Assets/netflixlogo.png";
import * as BiIcons from "react-icons/bs";
import LoginModal from "./LoginModal";
function Navigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [openModal, setOpenModal] = useState(false);
  const showModal = () => {
    return <LoginModal setOpenModal={setOpenModal} />;
  };

  return (
    <div className="flex flex-col">
      {openModal && showModal()}
      <div className="flex flex-row w-full justify-between items-center z-40 h-20">
        <div className="flex flex-row justify-center gap-4 text-white items-center cursor-pointer">
          <img src={logo} className="h-16 " alt="logo" />

          <div
            onClick={() => navigate("/")}
            className={`${
              pathname === "/" ? "text-white" : "text-customGray"
            } hover:text-white/80`}
          >
            HOME
          </div>
          <div
            onClick={() => navigate("/movies")}
            className={`${
              pathname !== "/" ? "text-white" : "text-customGray"
            } hover:text-white/80`}
          >
            MOVIES
          </div>
        </div>
        <div className="px-2 flex flex-row gap-1">
          <div className="flex flex-row items-center px-2 justify-center gap-2 bg-black/5">
            <BiIcons.BsSearch className="text-white" />
            <input
              type="text"
              className="text-sm focus:outline-none w-40 bg-transparent text-white"
              placeholder="SEARCH"
            />
          </div>
          <button
            className="flex flex-row gap-1 p-2 justify-center items-center bg-customBlack/70 text-white rounded-full text-sm"
            onClick={() => setOpenModal(true)}
          >
            <BiIcons.BsFillPersonFill size={18} />
            {/* <div>Sign up</div> */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
