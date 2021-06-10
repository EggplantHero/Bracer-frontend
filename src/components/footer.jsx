import React, { Fragment } from "react";
import DarkMode from "./buttons/darkMode";

const StickyFooter = () => {
  return (
    <Fragment>
      <footer className="fixed-bottom">
        <ul>
          <DarkMode></DarkMode>
        </ul>
      </footer>
      <div className="navbar-offset"></div>
    </Fragment>
  );
};

export default StickyFooter;
