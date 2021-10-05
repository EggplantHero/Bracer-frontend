import React from "react";
import { useSelector } from "react-redux";
import { getItemIcons } from "../../store/pokeapi";

const BraceIcon = ({ stat }) => {
  const braces = useSelector(getItemIcons);

  return (
    <span className="input-group-text input-group-text-custom d-flex justify-content-center">
      <img className="pe-none" src={braces[stat]} alt=""></img>
      {stat.toUpperCase()}
      {stat === "hp" && <span>&nbsp;</span>}
    </span>
  );
};

export default BraceIcon;
