import React from "react";

const PokeDisplay = ({ state }) => {
  const { sprite, eggGroups } = state;
  return (
    <div className="my-3">
      <div className="col-12 col-md-4 offset-md-4 d-inline-block">
        <div className="mx-auto imageParent bordered">
          <img className="pe-none" src={sprite} alt="" />
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
  );
};

export default PokeDisplay;
