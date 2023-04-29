import React, { useState } from "react";
import { useEffect } from "react";

import * as BiIcons from "react-icons/bs";
function LoginModal({ setOpenModal }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showSuccess, setshowSuccess] = useState(false);
  const [formVal, setFormVal] = useState({
    pass1: "",
    pass2: "",
  });
  console.log("formVal", formVal);
  useEffect(() => {
    const passwordChecker = () => {
      if (formVal?.pass1 !== "" && formVal?.pass2 !== "") {
        if (formVal?.pass1 === formVal?.pass2) return setshowSuccess(true);
        else return setshowSuccess(false);
      }
    };
    passwordChecker();
  }, [formVal]);

  const loginLayout = () => {
    return (
      <div className="flex flex-col gap-7 z-50 bg-black/80 w-full max-w-sm p-10 rounded-sm">
        <div className="text-lg text-white">Sign in</div>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            className="h-9 bg-[#333333] focus:outline-none text-white px-2 text-sm rounded-sm"
            placeholder="Email"
          />
          <div className="relative block">
            <input
              type={showPassword ? "text" : "password"}
              className="h-9 bg-[#333333] focus:outline-none text-white px-2 text-sm rounded-sm w-full block "
              placeholder="Password"
            />
            <button
              className="absolute inset-y-0 right-2 flex items-center text-white/80"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <BiIcons.BsFillEyeFill />
              ) : (
                <BiIcons.BsFillEyeSlashFill />
              )}
            </button>
          </div>
        </div>
        <button className="bg-customRed/90 text-white p-2 rounded-sm">
          Sign in
        </button>
        <div className="text-white text-xs ">
          Dont have account?{" "}
          <span
            className="text-customGray hover:text-white cursor-pointer"
            onClick={() => setIsLogin(false)}
          >
            Register
          </span>
        </div>
      </div>
    );
  };

  const registerLayout = () => {
    return (
      <div className="flex flex-col gap-5 z-50 bg-black/80 w-full max-w-sm p-10 rounded-sm">
        <div
          className="flex flex-row gap-1 text-customGray text-sm items-center hover:text-white"
          onClick={() => setIsLogin(true)}
        >
          <BiIcons.BsArrowLeft />
          <button>Back</button>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-lg text-white">Sign up</div>
          <div className="text-xs text-gray-400">
            Fill up the form to register
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            className="h-9 bg-[#333333] focus:outline-none text-white px-2 text-sm rounded-sm"
            placeholder="Email"
          />
          <div className="relative block">
            <input
              type={"password"}
              className="h-9 bg-[#333333] focus:outline-none text-white px-2 text-sm rounded-sm w-full block "
              placeholder="Password"
              value={formVal.pass1}
              onChange={(e) =>
                setFormVal({ ...formVal, pass1: e.target.value })
              }
            />
            <button
              className="absolute inset-y-0 right-2 flex items-center text-white/80"
              onClick={() => setShowPassword(!showPassword)}
            >
              {/* {showPassword ? (
                <BiIcons.BsFillEyeFill />
              ) : (
                <BiIcons.BsFillEyeSlashFill />
              )} */}
            </button>
          </div>
          <div className="relative block">
            <input
              type={"password"}
              className="h-9 bg-[#333333] focus:outline-none text-white px-2 text-sm rounded-sm w-full block "
              placeholder="Confirm Password"
              value={formVal.pass2}
              onChange={(e) =>
                setFormVal({ ...formVal, pass2: e.target.value })
              }
            />
            <button
              className="absolute inset-y-0 right-2 flex items-center text-white/80"
              onClick={() => setShowPassword(!showPassword)}
            >
              {/* {showPassword ? (
                <BiIcons.BsFillEyeFill />
              ) : (
                <BiIcons.BsFillEyeSlashFill />
              )} */}
            </button>
          </div>
          <div className="h-5 text-green-600 text-xs">
            {showSuccess && (
              <div className="flex flex-row gap-1 items-center">
                {" "}
                <BiIcons.BsCheckCircleFill /> <span>Password match!</span>
              </div>
            )}
          </div>
        </div>
        <button className="bg-customRed/90 text-white p-2 rounded-sm text-sm">
          Register
        </button>
      </div>
    );
  };
  return (
    <div className="h-screen w-full absolute">
      <div
        className="h-screen w-full z-40 absolute  flex justify-center items-center bg-black/40 "
        onClick={() => setOpenModal(false)}
      />
      <div className="h-screen w-full flex justify-center items-center hover:transition duration-700 ease-in-out ">
        {isLogin ? loginLayout() : registerLayout()}
      </div>
    </div>
  );
}

export default LoginModal;
