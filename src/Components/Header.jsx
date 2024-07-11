import React, { useState } from "react";
import logo from "../icons/logo.svg";
import logo_text from "../icons/BTCW pool.svg";
import ProfileData from "./ProfileData";

const Header = () => {
  const [menuMobileVisible, setMenuMobileVisible] = useState(false);

  const toggleMenuMobile = () => {
    setMenuMobileVisible(!menuMobileVisible);
  };

  return (
    <div className="app-header bg-gray-2 flex items-center z-50 justify-center py-2 px-2 sm:px-4">
      <div className="flex mr-6">
        <img width="50" className="" src={logo} alt="logo"></img>
        <img width="300" className="mx-2" src={logo_text} alt="logo_text"></img>
      </div>

      <div
        onClick={toggleMenuMobile}
        className={`visible-content flex flex-col h-10 w-10 cursor-pointer absolute right-4 rounded justify-center items-center group ${
          menuMobileVisible ? "open" : ""
        }`}
      >
        <div className="h-1 w-6 my-0.5 rounded-full bg-white transition ease transform duration-300 opacity-100 group-hover:opacity-100 bar1"></div>
        <div className="h-1 w-6 my-0.5 rounded-full bg-white transition ease transform duration-300 opacity-100 group-hover:opacity-100 bar2"></div>
        <div className="h-1 w-6 my-0.5 rounded-full bg-white transition ease transform duration-300 opacity-100 group-hover:opacity-100 bar3"></div>
      </div>

      <ProfileData menuMobileVisible={menuMobileVisible} />
    </div>
  );
};

export default Header;
