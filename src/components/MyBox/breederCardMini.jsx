import React, { useEffect, useState } from "react";
import { genderIcons, summarizeIvs } from "../../utils/remap";
import { getImgSm } from "../../utils/pokeApi";
import { BsLockFill, BsUnlock } from "react-icons/bs";
import capitalize from "../../utils/capitalize";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedId,
  removeSelectedId,
  getSelectedIds,
  setSelectedId,
  getSelectedTool,
} from "../../store/ui";
import { getCache } from "../../store/pokeapi";
import { toggleLock } from "../../store/breeders";

const BreederCardMini = ({ breeder }) => {
  const dispatch = useDispatch();
  const cache = useSelector(getCache);
  const selectedIds = useSelector(getSelectedIds);
  const selectedTool = useSelector(getSelectedTool);
  const { data, id, locked } = breeder;
  const { name, ivs, gender } = data;

  const handleSelection = () => {
    switch (selectedTool) {
      case "inspect":
        dispatch(setSelectedId(id));
        break;
      case "lock":
        dispatch(setSelectedId(id));
        dispatch(toggleLock(id));
        break;
      case "delete":
        if (selectedIds.includes(id)) {
          dispatch(removeSelectedId(id));
        } else {
          dispatch(addSelectedId(id));
        }
        break;

      default:
        break;
    }
  };

  const colors = {
    inspect: "blue",
    lock: "green",
    delete: "red",
  };

  const isSelected = () => {
    const selected = selectedIds.includes(id);
    if (selected) {
      console.log("COLOR", colors[selectedTool]);
      return `outline-${colors[selectedTool]}`;
    } else return "";
  };

  return (
    <div className={`breederContainerMini card ${locked && "treeCellBg"} `}>
      <button className={`btn ${isSelected()}`} onClick={handleSelection}>
        <h6
          className={`my-0 d-flex justify-content-center ${
            locked && "text-muted"
          }`}
        >
          <span className={gender}>{genderIcons[gender].icon}</span>
          <span>{capitalize(name)}</span>
          <span>{locked ? <BsLockFill /> : <BsUnlock />}</span>
        </h6>
        <div>
          <img src={cache[name].spriteSm} alt="" className="pe-none"></img>
        </div>
        <h6 className={`${locked && "text-muted"}`}>{summarizeIvs(ivs)}</h6>
      </button>
    </div>
  );
};

export default BreederCardMini;
