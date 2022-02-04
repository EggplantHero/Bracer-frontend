import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSidebar } from "../../store/ui";
import { FaBoxOpen } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
import { CgPokemon } from "react-icons/cg";
import { GrInfo } from "react-icons/gr";
import { getTrees } from "../../store/trees";
import MyBreedsNavItem from "./MyBreedsNavItem";
import { resetCoordinates } from "../../store/ui";

const SideNav = () => {
  const expanded = useSelector(getSidebar);
  const trees = useSelector(getTrees);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(0);

  const navItems = [
    {
      url: "/about",
      icon: <GrInfo />,
      text: "About",
      rendercondition: true,
      onClick: () => {
        setSelected(0);
        dispatch(resetCoordinates);
      },
    },
    {
      url: "/my-box",
      icon: <FaBoxOpen />,
      text: "My Box",
      rendercondition: true,
      onClick: () => {
        setSelected(0);
        dispatch(resetCoordinates);
      },
    },
    {
      url: "/new",
      icon: <MdCreateNewFolder />,
      text: "New Breed",
      rendercondition: true,
      onClick: () => {
        setSelected(0);
        dispatch(resetCoordinates);
      },
    },
    {
      url: `/my-breeds/${trees[0] ? trees[0].id : "/"}`,
      icon: <CgPokemon />,
      text: "My Breeds",
      rendercondition: trees[0],
      onClick: () => {
        setSelected(trees[0] && trees[0].id);
        dispatch(resetCoordinates);
      },
    },
  ];

  return (
    <div
      className={`navbar sidenav sidenav-${expanded ? "active" : "collapsed"}`}
    >
      <ul className="navbar-nav">
        {navItems.map(({ url, icon, text, rendercondition, onClick }) => {
          return (
            <Fragment key={url}>
              {rendercondition && (
                <NavLink
                  className="nav-item nav-link"
                  to={url}
                  onClick={onClick}
                >
                  <div className="mx-5 d-flex justify-content-start">
                    <span>{icon}</span>
                    <span className="mx-3">{text}</span>
                  </div>
                </NavLink>
              )}
            </Fragment>
          );
        })}
        <div className="sidenav-overflow">
          {trees.map((tree) => (
            <NavLink
              className={`nav-item nav-link user-select-none ${
                selected === tree.id && "disabled"
              }`}
              to={`/my-breeds/${tree.id}`}
              key={tree.id}
              onClick={() => {
                setSelected(tree.id);
                dispatch(resetCoordinates());
              }}
            >
              <MyBreedsNavItem tree={tree} />
            </NavLink>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default SideNav;
