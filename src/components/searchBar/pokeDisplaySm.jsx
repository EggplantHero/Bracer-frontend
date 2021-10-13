import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { getCache } from "../../store/pokeapi";

const PokeDisplaySm = ({ name }) => {
  const cache = useSelector(getCache);
  return (
    <Fragment>
      <div className="d-inline-block">
        {name && <img className="pe-none" src={cache[name].spriteSm} alt="" />}
      </div>
      <div className="d-flex justify-content-center">
        {name &&
          cache[name].eggGroups.map((egg) => (
            <h6 key={egg} className="card bg-secondary text-white px-2 mx-1">
              {egg}
            </h6>
          ))}
      </div>
    </Fragment>
  );
};

export default PokeDisplaySm;
