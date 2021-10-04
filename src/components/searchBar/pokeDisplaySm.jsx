import React from "react";

const PokeDisplaySm = ({ state }) => {
  const { spriteSm } = state;
  return (
    <div className="my-3 mx-auto">
      <img className="pe-none" src={spriteSm} alt="" />
    </div>
  );
};

export default PokeDisplaySm;
