import React, { useEffect, useState } from "react";
import { getImgSm } from "../../utils/pokeApi";
import capitalize from "../../utils/capitalize";
import { genderIcons } from "../../utils/remap";

const TreeCell = ({ poke, level, index }) => {
  const { name, ivs, gender } = poke.data;
  const [sprite, setSprite] = useState("");
  const ivKeys = Object.keys(ivs);

  useEffect(() => {
    const fetchImgSm = async () => {
      const response = await getImgSm(name);
      setSprite(response);
    };
    fetchImgSm();
  }, [name]);

  return (
    <div className="card">
      <div className="d-flex justify-content-center">
        {gender && (
          <h5
            style={{
              color: genderIcons[gender].color,
            }}
          >
            {genderIcons[gender].icon}
          </h5>
        )}
        <h5>{name}</h5>
      </div>
      <div>
        <img src={sprite} alt="" />
      </div>
      {ivKeys.map(
        (iv) =>
          ivs[iv] !== -1 && (
            <h6 key={iv}>
              {iv.toUpperCase()}: {ivs[iv]}
            </h6>
          )
      )}
    </div>
  );
};

export default TreeCell;
