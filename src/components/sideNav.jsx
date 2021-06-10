import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getSidebar } from "../store/ui";
import { CgPokemon } from "react-icons/cg";
import { FaBoxOpen } from "react-icons/fa";
import { BsClockHistory } from "react-icons/bs";

const SideNav = () => {
  const expanded = useSelector(getSidebar);

  const navItems = [
    {
      url: "/new",
      icon: <CgPokemon />,
      text: "New Breed",
    },
    {
      url: "/my-box",
      icon: <FaBoxOpen />,
      text: "My Box",
    },
    {
      url: "/history",
      icon: <BsClockHistory />,
      text: "History",
    },
  ];

  return (
    <div
      className={`navbar sidenav sidenav-${expanded ? "active" : "collapsed"}`}
    >
      <ul className="navbar-nav">
        {navItems.map(({ url, icon, text }) => {
          return (
            <NavLink className="nav-item nav-link" to={url} key={url}>
              <div className="mx-5 d-flex justify-content-start">
                <span>{icon}</span>
                <span className="mx-3">{text}</span>
              </div>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
};

export default SideNav;
