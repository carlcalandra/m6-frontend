import React from "react";
import NavBar from "./BlogNavbar";
import { Outlet } from "react-router-dom";

const NavbarContainer = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default NavbarContainer;
