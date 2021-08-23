import React, { useEffect, useState } from "react";
import { genderIcons, summarizeIvs } from "../../utils/remap";
import { getImgSm } from "../../utils/pokeApi";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedId,
  removeSelectedId,
  getSelectedIds,
  setSelectedId,
  getSelectedTool,
} from "../../store/ui";

const BreederCardMini = ({ breeder }) => {
  const dispatch = useDispatch();
  const selectedIds = useSelector(getSelectedIds);
  const selectedTool = useSelector(getSelectedTool);
  const { data, id } = breeder;
  const { name, ivs, gender } = data;
  const [url, setUrl] = useState("");

  useEffect(() => {
    const setImg = async () => {
      const url = await getImgSm(name);
      setUrl(url);
    };
    setImg();
  }, [name]);

  const handleSelection = () => {
    if (selectedTool === "inspect") {
      dispatch(setSelectedId(breeder.id));
    } else {
      if (selectedIds.includes(breeder.id)) {
        dispatch(removeSelectedId(breeder.id));
      } else {
        dispatch(addSelectedId(breeder.id));
      }
    }
  };

  const isSelected = () => {
    const selected = selectedIds.includes(breeder.id);
    if (selected) {
      return `outline-${selectedTool === "inspect" ? "blue" : "red"}`;
    } else return "";
  };

  return (
    <div className="breederContainerMini card">
      <button className={`btn ${isSelected()}`} onClick={handleSelection}>
        <h6 className="my-0 d-flex justify-content-center">
          <span className={gender}>{genderIcons[gender].icon}</span>
          <span>{breeder.data.name}</span>
        </h6>
        <div>
          <img src={url} alt="" className="pe-none"></img>
        </div>
        <h6>{summarizeIvs(ivs)}</h6>
      </button>
    </div>
  );
};

export default BreederCardMini;
