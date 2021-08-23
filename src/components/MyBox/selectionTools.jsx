import React from "react";
import { BsSearch, BsTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedTool,
  setSelectedTool,
  setSelectedId,
} from "../../store/ui";

const SelectionTools = () => {
  const dispatch = useDispatch();
  const selectedTool = useSelector(getSelectedTool);
  return (
    <div>
      <h6>Selection tools:</h6>
      <button
        className={`btn btn-info mx-1 ${
          selectedTool === "inspect" && "outline-blue"
        }`}
        onClick={() => {
          dispatch(setSelectedTool("inspect"));
          dispatch(setSelectedId(null));
        }}
      >
        <BsSearch />
      </button>
      <button
        className={`btn btn-danger mx-1 ${
          selectedTool === "delete" && "outline-red"
        }`}
        onClick={() => {
          dispatch(setSelectedTool("delete"));
          dispatch(setSelectedId(null));
        }}
      >
        <BsTrashFill />
      </button>
    </div>
  );
};

export default SelectionTools;
