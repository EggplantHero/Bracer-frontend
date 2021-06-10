import React, { useState, useEffect } from "react";
import { getAllBraceIcons } from "../../utils/pokeApi";

const BraceIcon = ({ stat }) => {
  const [braces, setBraces] = useState([]);

  //get brace icons
  useEffect(() => {
    const getBraces = async () => {
      const bracesIcons = await getAllBraceIcons();
      setBraces(bracesIcons);
    };
    getBraces();
  }, [braces.length]);

  return (
    <span className="input-group-text input-group-text-custom d-flex justify-content-center">
      <img className="pe-none" src={braces[stat]} alt=""></img>
      {stat.toUpperCase()}
      {stat === "hp" && <span>&nbsp;</span>}
    </span>
  );
};

export default BraceIcon;
