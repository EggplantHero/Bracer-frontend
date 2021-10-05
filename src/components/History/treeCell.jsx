import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import capitalize from "../../utils/capitalize";
import { genderIcons, statColors } from "../../utils/remap";
import capitalize from "../../utils/capitalize";
import { BiEdit } from "react-icons/bi";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { editBreeder, toggleBreeder } from "../../store/trees";
import { useDispatch } from "react-redux";
import "react-bootstrap-typeahead/css/Typeahead.css";
import SearchBarContainer from "../searchBar/searchBarContainer";
import GenderSelect from "../searchBar/genderSelect";
import { getCache, getItemIcons } from "../../store/pokeapi";
import PokeDisplay from "../searchBar/pokeDisplay";

const TreeCell = ({ poke, level, index, treeId }) => {
  const dispatch = useDispatch();
  const { name, ivs, gender, item, breeder } = poke.data;
  const braces = useSelector(getItemIcons);
  const cache = useSelector(getCache);
  const [inputVisible, setInputVisible] = useState(false);
  const ivKeys = ["hp", "atk", "def", "spa", "spd", "spe"];

  useEffect(() => {
    console.log(name, index, level);
  }, [name]);

  const toggleInput = () => {
    console.log("toggle input");
    setInputVisible(!inputVisible);
    console.log(inputVisible);
  };

  const onSearchbarChange = (input) => {
    const { possibleGenders } = cache[input.name];
    dispatch(
      editBreeder({
        level,
        index,
        treeId,
        name: input.name,
        gender: !possibleGenders.includes(gender) && possibleGenders[0],
      })
    );
    toggleInput();
  };

  const handleGenderSelect = (input) => {
    console.log("handlegenderselect");
    dispatch(
      editBreeder({
        level,
        index,
        treeId,
        name,
        gender: input,
      })
    );
    toggleInput();
  };

  return (
    <div className={`card treeCell ${breeder && "treeCellBg"}`}>
      <div className="d-flex justify-content-center">
        {inputVisible ? (
          <div>
            <SearchBarContainer
              small={true}
              size={6}
              onSearchbarChange={onSearchbarChange}
            />
            <GenderSelect
              handleGenderSelect={handleGenderSelect}
              selectedGender={gender}
              possibleGenders={cache[name].possibleGenders}
            />
          </div>
        ) : (
          <div className="d-flex">
            {gender && <h5 className={gender}>{genderIcons[gender].icon}</h5>}
            <h5>{name ? capitalize(name) : "..."}</h5>
          </div>
        )}
        <button className="btn" onClick={() => toggleInput()}>
          <BiEdit />
        </button>
      </div>
      {!inputVisible && (
        <div className="d-flex justify-content-center mb-3">
          <PokeDisplay name={name} small={true} />
          <div>
            <img src={braces[item]} alt="" />
          </div>
        </div>
      )}
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
