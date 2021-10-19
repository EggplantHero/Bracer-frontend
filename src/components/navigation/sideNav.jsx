import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSidebar } from "../../store/ui";
import { CgPokemon } from "react-icons/cg";
import { FaBoxOpen } from "react-icons/fa";
import { BsClockHistory } from "react-icons/bs";
import { getTrees } from "../../store/trees";
import HistoryNavItem from "./historyNavItem";
import { resetCoordinates } from "../../store/ui";

const SideNav = () => {
  const expanded = useSelector(getSidebar);
  const trees = useSelector(getTrees);
  const dispatch = useDispatch();

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
      url: `/history/${trees[0] ? trees[0].id : "/"}`,
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
            <NavLink
              className="nav-item nav-link"
              to={url}
              key={url}
              onClick={() => dispatch(resetCoordinates())}
            >
              <div className="mx-5 d-flex justify-content-start">
                <span>{icon}</span>
                <span className="mx-3">{text}</span>
              </div>
            </NavLink>
          );
        })}
        <div className="sidenav-overflow">
          {trees.map((tree) => (
            <NavLink
              className="nav-item nav-link"
              to={`/history/${tree.id}`}
              key={tree.id}
              onClick={() => dispatch(resetCoordinates())}
            >
              <HistoryNavItem tree={tree} />
            </NavLink>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default SideNav;
