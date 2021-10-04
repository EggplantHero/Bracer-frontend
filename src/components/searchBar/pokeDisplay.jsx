import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCache } from "../../store/pokeapi";

const PokeDisplay = ({ name, small }) => {
  const cache = useSelector(getCache);
  const [state, setState] = useState({});
  const { sprite, spriteSm, eggGroups } = state;

  useEffect(() => {
    if (!name) return;
    setState(cache[name]);
  }, [name]);

  return (
    <div>
      {!small ? (
        <div>
          <div className="col-12 col-md-4 offset-md-4 d-inline-block">
            <div className="mx-auto imageParent bordered">
              {sprite && <img className="pe-none" src={sprite} alt="" />}
            </div>
          </div>
          <div className="col-md-4 d-inline-block mt-2">
            <div className="mx-3">
              {eggGroups &&
                eggGroups.map((group, index) => (
                  <p key={index} className="badge d-block">
                    {group}
                  </p>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <img className="pe-none" src={spriteSm} alt="" />
      )}
    </div>
  );
};

export default PokeDisplay;
