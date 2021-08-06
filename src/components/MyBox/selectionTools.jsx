import React from "react";
import { BsSearch, BsTrashFill } from "react-icons/bs";

const SelectionTools = ({ config, setConfig }) => {
  return (
    <div>
      <h6>Selection tools:</h6>
      <button
        className={`btn btn-info mx-1 ${config === "inspect" && "outline"}`}
        onClick={() => setConfig("inspect")}
      >
        <BsSearch />
      </button>
      <button
        className={`btn btn-danger mx-1 ${config === "delete" && "outline"}`}
        onClick={() => setConfig("delete")}
      >
        <BsTrashFill />
      </button>
    </div>
  );
};

export default SelectionTools;
