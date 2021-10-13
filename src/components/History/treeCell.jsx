import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { genderIcons } from "../../utils/remap";
import capitalize from "../../utils/capitalize";
import { BiEdit } from "react-icons/bi";
import { editBreeder, toggleBreeder } from "../../store/trees";
import "react-bootstrap-typeahead/css/Typeahead.css";
import SearchBarContainer from "../searchBar/searchBarContainer";
import GenderSelect from "../searchBar/genderSelect";
import { getCache, getItemIcons } from "../../store/pokeapi";
import PokeDisplaySm from "../searchBar/pokeDisplaySm";
import IvGrid from "./ivGrid";
import Checkbox from "./checkbox";

const TreeCell = ({ poke, level, index, treeId }) => {
  const dispatch = useDispatch();
  const { name, ivs, gender, item, breeder } = poke.data;
  const braces = useSelector(getItemIcons);
  const cache = useSelector(getCache);
  const [editable, setEditable] = useState(false);
  const allGenders = ["male", "female", "genderless"];

  const toggleInput = () => {
    setEditable(!editable);
  };

  const onSearch = (input) => {
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

  const onGenderSelect = (input) => {
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

  const onCheckboxClick = () => {
    dispatch(toggleBreeder({ level, index, treeId }));
  };

  return (
    <div>
      <button
        className="btn position-absolute"
        style={{ top: "0", right: "0" }}
        onClick={toggleInput}
      >
        <BiEdit />
      </button>
      <div
        className="d-flex justify-content-center mt-1"
        style={{ height: "110px" }}
      >
        {editable ? (
          <div>
            <SearchBarContainer small={true} size={8} onSearch={onSearch} />
            <div className="mt-1">
              <GenderSelect
                onGenderSelect={onGenderSelect}
                selectedGender={gender}
                possibleGenders={
                  name ? cache[name].possibleGenders : allGenders
                }
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="d-flex justify-content-center">
              {gender && <h5 className={gender}>{genderIcons[gender].icon}</h5>}
              <h5>{name ? capitalize(name) : "..."}</h5>
              <div style={{ width: "20px" }}></div>
            </div>
            <div>
              <div className="d-inline-block">
                <img src={braces[item]} alt="" />
              </div>
              <PokeDisplaySm name={name} />
            </div>
          </div>
        )}
      </div>
      <IvGrid ivs={ivs} />
      <Checkbox onClick={onCheckboxClick} bool={breeder} />
    </div>
  );
};

export default TreeCell;
