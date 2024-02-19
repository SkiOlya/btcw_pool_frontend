import React, { useState, useEffect, useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faTelegram,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import NavBar from "./NavBar";

const ProfileData = ({ menuMobileVisible }) => {
  const headerLeftClass = menuMobileVisible ? "" : "invisible-content";

  return (
    <div className={`app-header__content ${headerLeftClass}`}>
      <div className={`app-header-left ${headerLeftClass}`}>
        <NavBar />
      </div>
      <div className="app-header-right">
      <a href="https://t.me/utxopool" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faTelegram} size="2xl" />
      </a>

      </div>
    </div>
  );
};

export default ProfileData;
