import React, { useContext } from "react";
import FormContext from "../../contexts/formContext";
import "../../inputRange.css";
import { getIvColor } from "../../utils/remap";

const InputRange = ({ stat }) => {
  const [formState, setFormState] = useContext(FormContext);

  const value = formState.ivs[stat];

  const updateIv = (input) => {
    setFormState({
      ...formState,
      ivs: {
        ...formState.ivs,
        [stat]: parseInt(input),
      },
    });
  };

  return (
    <div className="d-flex justify-content-between">
      <div className="mx-3">
        <button
          onClick={() => updateIv(-1)}
          className={`btn btn-max btn-danger btn-sm ${
            value === -1 && "disabled"
          }`}
        >
          OFF
        </button>
      </div>
      <input
        className={`inputRange ${getIvColor(value)}`}
        type="range"
        id="stat"
        name="stat"
        min="-1"
        max="31"
        value={value}
        onChange={(e) => updateIv(e.target.value)}
      />
      <div className="mx-3">
        <button
          onClick={() => updateIv(31)}
          className={`btn btn-max btn-success btn-sm ${
            value === 31 && "disabled"
          }`}
        >
          MAX
        </button>
      </div>
    </div>
  );
};

export default InputRange;
