import React, { useEffect, useState } from "react";
import home from "./icons/home.png";

const Home = () => {
  return (
    <div
      id="home-section"
      className="pt-18 z-0 p-2 w-full h-100vh rounded-3xl bg-[#060030]"
    >
      <div className=" text-center space-y-2 ">
        <h1>Welcome to BTCW Pool</h1>
        <h1>Under Construction</h1>
        <div className="row flex justify-center items-center">
          <div className="col-10 col-sm-6 col-md-6 col-xl-3 w-full rounded-2xl">
            <img className="rounded-2xl logo" src={home} alt="home"></img>
          </div>
        </div>

        <h2>
          We are excited to introduce BTCW Pool. Our platform is currently under
          development
        </h2>
        <h2>
          While we put the finishing touches on BTCW Pool, check out the current
          top mining addresses on our network.
        </h2>
      </div>
      {/* <div className="row">
        <div className="col-md-7 col-xl-7">
          <h1>Statistics</h1>
        </div>
        <div className="col-md-3 col-xl-3">
          <h1>Statistics for Address</h1>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
