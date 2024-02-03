import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const StyledNavLink = styled(NavLink)`
  &.active {
    font-size: 1.5rem;
    line-height: 1.75rem;
    border-color: #28a0f0;
    color: #28a0f0;
  }
`;

const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 170px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 12;
  border-radius: 0.375rem;
  padding: 0.25rem;
  text-align: center;

  a {
    float: none;
    color: black;
    padding: 6px 10px;
    text-decoration: none;
    display: block;
    text-align: left;
  }

  a:hover {
    background-color: #ddd;
    border-radius: 0.375rem;
  }
`;

const Dropdown = styled.a`
  position: relative;
  display: inline-block;

  &:hover ${DropdownMenu} {
    display: block;
  }
`;
const NavBar = () => {
  const location = useLocation();
  const isNftActive = location.pathname.startsWith("/dapps");

  return (
    <ul className="widget-content menu menu-space-y-4 menu-space-x space-x-12 flex  lg:flex-row flex-col lg:items-center  justify-center items-center">
      <StyledNavLink to="/" className="hover:no-underline font-medium text-lg">
        Pool
      </StyledNavLink>

      <StyledNavLink
        to="/topAddresses"
        className="hover:no-underline font-medium text-lg"
      >
        Top Mining addresses
      </StyledNavLink>

      <StyledNavLink
        to="/feeCalculation"
        className="hover:no-underline font-medium text-lg"
      >
        Fee Calculation
      </StyledNavLink>
    </ul>
  );
};

export default NavBar;
