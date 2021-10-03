import React from "react";
import { genderIcons } from "../../utils/remap";

const GenderSelect = ({
  handleGenderSelect,
  selectedGender,
  possibleGenders,
}) => {
  return (
    <div>
      {possibleGenders.map((g) => (
        <button
          key={g}
          className={`mx-1 btn btn-outline-secondary ${g}${
            g === selectedGender ? " active" : ""
          }`}
          onClick={() => handleGenderSelect(g)}
        >
          {genderIcons[g].icon}
        </button>
      ))}
    </div>
  );
};

export default GenderSelect;
