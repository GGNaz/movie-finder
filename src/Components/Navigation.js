import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png";
import * as BiIcons from "react-icons/bs";
import LoginModal from "./LoginModal";
function Navigation() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const showModal = () => {
    return <LoginModal />;
  };
  return (
    <div className="flex flex-col">
      {openModal && showModal()}
      <div className="flex flex-row w-full justify-between items-center z-40 h-20">
        <div className="flex flex-row justify-center gap-4 text-white items-center cursor-pointer">
          <img src={logo} className="h-16 w-12" alt="logo" />
          {/* <div>TOP CAST</div>
                  <div>PHOTOS</div> */}
          <div onClick={() => navigate("/")}>HOME</div>
          <div onClick={() => navigate("/movies")}>MOVIES</div>
        </div>
        <div className="p-4 text-white">
          <button className="flex flex-row gap-1 px-2 justify-center items-center bg-customBlack/70 text-white py-1 rounded-lg text-sm" onClick={() => setOpenModal(true)}>
            <BiIcons.BsFillPersonFill size={18} />
            <div>Sign up</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
