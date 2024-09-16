import React from "react";

import { useNavigate } from "react-router-dom";
import Header from "./header/Header";
import "./Layout.css"

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container-fluid pb-4">
        <div className="row">
          <Header />
        </div>
        <div className="row">
          <div className="childrenContainer">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;