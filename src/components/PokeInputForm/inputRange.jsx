import React, { useContext } from "react";
import FormContext from "../../contexts/formContext";
import "../../inputRange.css";

const InputRange = ({ stat }) => {
  const [formState, setFormState] = useContext(FormContext);

  const value = formState.ivs[stat];
  const color = (value) => {
    switch (value) {
      case 31:
        return "green";
      case 0:
        return "orange";
      case -1:
        return "red";
      default:
        return "yellow";
    }
  };

  const updateIv = (value) => {
    setFormState({
      ...formState,
      ivs: {
        ...formState.ivs,
        [stat]: parseInt(value),
      },
    });
  };

  return (
    <div className="mx-4">
      <input
        className={`inputRange ${color(value)}`}
        type="range"
        id="stat"
        name="stat"
        min="-1"
        max="31"
        onChange={(e) => updateIv(e.target.value)}
      />
    </div>
  );
};

export default InputRange;
