import React, { useEffect, useState } from "react";
import { getImgSm, getAllBraceIcons } from "../../utils/pokeApi";
// import capitalize from "../../utils/capitalize";
import { genderIcons, statColors } from "../../utils/remap";
import { BiEdit } from "react-icons/bi";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { editBreeder } from "../../store/trees";
import { useDispatch } from "react-redux";

const TreeCell = ({ poke, level, index, treeId }) => {
  const { name, ivs, gender, item, breeder } = poke.data;
  const dispatch = useDispatch();
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
    <div className={`card treeCell ${breeder && "treeCellBg"}`}>
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
        <div className="d-flex">
          <h5>{name ? name : "..."}</h5>
        </div>
      </div>

      <div className="d-flex justify-content-center mb-3">
        <div>
          <img src={sprite} alt="" />
        </div>
        <div>
          <img src={braces[item]} alt="" />
        </div>
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
          <div>
            <button
              className="btn"
              onClick={() => dispatch(editBreeder({ level, index, treeId }))}
            >
              Completed:{" "}
              {breeder ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeCell;
