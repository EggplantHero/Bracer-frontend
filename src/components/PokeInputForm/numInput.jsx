import React, { useContext } from "react";
import FormContext from "../../contexts/formContext";

const NumInput = ({ stat, value, disabled }) => {
  const [formState, setFormState] = useContext(FormContext);
  const { ivs } = formState;
  return (
    <input
      type="number"
      className={`form-control col-auto ${disabled ? "pe-none" : ""}`}
      value={value}
      disabled={disabled}
      onChange={(e) =>
        setFormState({
          ...formState,
          ivs: {
            ...ivs,
            [stat]: { ...ivs[stat], value: parseInt(e.target.value) },
          },
        })
      }
    />
  );
};

export default NumInput;
