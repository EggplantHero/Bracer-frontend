import React, { useContext } from "react";
import FormContext from "../../contexts/formContext";
import { genderIcons } from "../../utils/remap";

const GenderSelect = () => {
  const [formState, setFormState] = useContext(FormContext);
  const { possibleGenders } = formState;

  return (
    <div>
      {possibleGenders.map((gender) => (
        <button
          key={gender}
          className={`mx-1 btn btn-outline-secondary ${gender}${
            formState.gender === gender ? " active" : ""
          }`}
          onClick={() => setFormState({ ...formState, gender })}
        >
          {genderIcons[gender].icon}
        </button>
      ))}
    </div>
  );
};

export default GenderSelect;
