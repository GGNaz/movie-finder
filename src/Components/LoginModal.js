import React from "react";
import { useState } from "react";
import * as BiIcons from "react-icons/bs";
function LoginModal() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="h-screen w-full z-50 absolute  flex justify-center items-center bg-black/50">
      <div className="flex flex-col gap-7 bg-black/80 w-full max-w-sm p-10 rounded-sm">
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
              <BiIcons.BsFillEyeFill />
            </button>
          </div>
        </div>
        <button className="bg-customRed/90 text-white p-2 rounded-sm">
          Sign in
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
