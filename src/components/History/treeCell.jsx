import React, { useEffect, useState } from "react";
import { getImgSm, getAllBraceIcons } from "../../utils/pokeApi";
// import capitalize from "../../utils/capitalize";
import { genderIcons, statColors } from "../../utils/remap";
import { BiEdit } from "react-icons/bi";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { editBreeder, toggleBreeder } from "../../store/trees";
import { useDispatch } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

const TreeCell = ({ poke, level, index, treeId, allPokes }) => {
  const { name, ivs, gender, item, breeder } = poke.data;
  const dispatch = useDispatch();
  const [sprite, setSprite] = useState("");
  const [braces, setBraces] = useState([]);
  const [selectedGender, setSelectedGender] = useState(gender);
  // const [input, setInput] = useState("");
  const [inputVisible, setInputVisible] = useState(false);

  const ivKeys = ["hp", "atk", "def", "spa", "spd", "spe"];

  useEffect(() => {
    const onLoad = async () => {
      setSprite(await getImgSm(name));
      setBraces(await getAllBraceIcons());
    };
    onLoad();
  }, [name]);

  const handleChange = (input) => {
    // setInput(input[0]);
    dispatch(
      editBreeder({
        level,
        index,
        treeId,
        name: input[0],
        gender: selectedGender,
      })
    );
    setInputVisible(!inputVisible);
  };

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
          {inputVisible ? (
            <div>
              <div>
                {["male", "female", "genderless"].map((g) => (
                  <button
                    key={g}
                    className={`mx-1 btn btn-outline-secondary ${g}${
                      gender === g ? " active" : ""
                    }`}
                    onClick={() => {
                      dispatch(
                        editBreeder({ index, level, treeId, gender: g })
                      );
                      setInputVisible(!inputVisible);
                    }}
                  >
                    {genderIcons[g].icon}
                  </button>
                ))}
              </div>
              <div className="mx-auto" spellCheck="false">
                <Typeahead
                  id="typeahead"
                  placeholder="Name..."
                  minLength={2}
                  highlightOnlyResult
                  onChange={(selected) => {
                    handleChange(selected);
                  }}
                  options={allPokes}
                ></Typeahead>
              </div>
            </div>
          ) : (
            <h5>{name ? name : "..."}</h5>
          )}
        </div>
        <button className="btn" onClick={() => setInputVisible(!inputVisible)}>
          <BiEdit />
        </button>
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
              onClick={() => dispatch(toggleBreeder({ level, index, treeId }))}
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
