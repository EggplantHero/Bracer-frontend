import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { collapseSidebar } from "../../store/ui";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <Fragment>
      <nav className="navbar navbar-top fixed-top">
        <ul className="d-flex align-items-center">
          <button
            className="btn btn-outline-light"
            onClick={() => dispatch(collapseSidebar())}
          >
            <GiHamburgerMenu />
          </button>
          <h1 className="d-inline-block mx-3 user-select-none">BRACER</h1>
        </ul>
      </nav>
      <nav className="navbar-offset"></nav>
    </Fragment>
  );
};

export default Navbar;
