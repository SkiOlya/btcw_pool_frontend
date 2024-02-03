import React, { useState, useEffect, useContext, useRef } from "react";

import NavBar from "./NavBar";

const ProfileData = ({ menuMobileVisible }) => {
  const headerLeftClass = menuMobileVisible ? "" : "invisible-content";

  return (
    <div className={`app-header__content ${headerLeftClass}`}>
      <div className={`app-header-left ${headerLeftClass}`}>
        <NavBar />
      </div>
      <div className="app-header-right"></div>
    </div>
  );
};

export default ProfileData;
