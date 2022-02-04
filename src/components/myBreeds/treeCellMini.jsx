import React from "react";
import { useSelector } from "react-redux";
import { getCache, getItemIcons } from "../../store/pokeapi";
import capitalize from "../../utils/capitalize";
import { genderIcons, summarizeIvs } from "../../utils/remap";

const TreeCellMini = ({ poke }) => {
  const { name, ivs, gender, item } = poke.data;
  const braces = useSelector(getItemIcons);
  const cache = useSelector(getCache);

  return (
    <div className="row">
      <div className="col-6">
        <h5>
          {gender && <span className={gender}>{genderIcons[gender].icon}</span>}{" "}
          {summarizeIvs(ivs)} {name && capitalize(name)}
        </h5>
      </div>
      <div className="col-2">
        {name && <img className="pe-none" src={cache[name].spriteSm} alt="" />}
      </div>
      <div className="col-2">
        <img src={braces[item]} alt="" />
      </div>
    </div>
  );
};

export default TreeCellMini;
