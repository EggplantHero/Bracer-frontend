import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { getCache } from "../../store/pokeapi";

const PokeDisplay = ({ name }) => {
  const cache = useSelector(getCache);

  return (
    <Fragment>
      <div className="my-3">
        <div className="col-12 col-md-4 offset-md-4 d-inline-block">
          <div className="mx-auto imageParent bordered">
            {name && (
              <img className="pe-none" src={cache[name].sprite} alt="" />
            )}
          </div>
        </div>
        <div className="col-md-4 d-inline-block mt-2">
          <div className="mx-3">
            {name &&
              cache[name].eggGroups.map((group, index) => (
                <p key={index} className="badge d-block">
                  {group}
                </p>
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PokeDisplay;
