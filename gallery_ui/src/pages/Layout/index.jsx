import React from "react";
import PrimaryNavBar from "../../components/PrimaryNavBar/Index";
import { Outlet } from "react-router-dom";
const LayOut = () => {
  return (
    <>
      <PrimaryNavBar />
      <Outlet />
    </>
  );
};

export default LayOut;
