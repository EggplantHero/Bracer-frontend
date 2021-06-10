import React from "react";
import DarkModeToggleButton from "react-dark-mode-toggle";
import { toggleDarkMode, getMode } from "../../store/ui";
import { useDispatch, useSelector } from "react-redux";

const DarkMode = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(getMode);

  return (
    <DarkModeToggleButton
      onChange={() => dispatch(toggleDarkMode())}
      checked={darkMode === "light" ? false : true}
      size={65}
    ></DarkModeToggleButton>
  );
};

export default DarkMode;
