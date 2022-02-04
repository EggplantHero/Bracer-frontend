import React from "react";
import { BsSearch, BsTrashFill, BsFillUnlockFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedTool,
  setSelectedTool,
  setSelectedId,
} from "../../store/ui";

const SelectionTools = () => {
  const dispatch = useDispatch();
  const selectedTool = useSelector(getSelectedTool);

  const tools = [
    { name: "inspect", color: "blue", flavor: "primary", icon: <BsSearch /> },
    {
      name: "lock",
      color: "green",
      flavor: "success",
      icon: <BsFillUnlockFill />,
    },
    { name: "delete", color: "red", flavor: "danger", icon: <BsTrashFill /> },
  ];
  return (
    <div>
      <h6>Selection tools:</h6>
      {tools.map(({ name, color, flavor, icon }) => (
        <button
          className={`btn btn-${flavor} mx-1 ${
            selectedTool === name && `outline-${color}`
          }`}
          key={name}
          onClick={() => {
            dispatch(setSelectedTool(name));
            dispatch(setSelectedId(null));
            console.log("selected tool:", selectedTool);
          }}
        >
          {icon}
        </button>
      ))}
    </div>
  );
};

export default SelectionTools;
