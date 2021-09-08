import React, { useEffect, useState } from "react";
import { getImgSm, getAllBraceIcons } from "../../utils/pokeApi";
// import capitalize from "../../utils/capitalize";
import { genderIcons, statColors } from "../../utils/remap";

const TreeCell = ({ poke, level, index, treeId }) => {
  const { name, ivs, gender, item, breeder } = poke.data;
  const [sprite, setSprite] = useState("");
  const [braces, setBraces] = useState([]);

  const ivKeys = ["hp", "atk", "def", "spa", "spd", "spe"];

  useEffect(() => {
    const onLoad = async () => {
      setSprite(await getImgSm(name));
      setBraces(await getAllBraceIcons());
    };
    onLoad();
  }, [name]);

  return (
    <div
      className="card treeCell"
      // style={{ backgroundColor: breeder && "lightgreen" }}
    >
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
        <h5>{name ? name : "..."}</h5>
        {/* <button onClick={() => console.log(level, index, treeId)}>edit</button> */}
      </div>
      <div className="d-flex justify-content-center mb-3">
        <img src={sprite} alt="" />
        <img src={braces[item]} alt="" />
      </div>
      <div className="container-fluid">
        <div className="row">
          {ivKeys.map((iv) => (
            <div key={iv} className="col-4 card ivCell">
              {ivs[iv] !== -1 && (
                <h6 style={{ color: statColors[iv] }}>
                  {ivs[iv]} {iv.toUpperCase()}
                </h6>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreeCell;
