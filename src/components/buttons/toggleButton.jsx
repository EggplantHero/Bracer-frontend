import React, { useContext } from "react";
import { FaCheck, FaBan } from "react-icons/fa";
import FormContext from "../../contexts/formContext";

const ToggleButton = ({ stat }) => {
  const [formState, setFormState] = useContext(FormContext);
  const { ivs } = formState;
  const active = formState.ivs[stat].active;
  return (
    <button
      className={`btn btn-${active ? "success" : "danger"}`}
      onClick={() =>
        setFormState({
          ...formState,
          ivs: {
            ...ivs,
            [stat]: { ...ivs[stat], active: !active },
          },
        })
      }
    >
      {active ? <FaCheck /> : <FaBan />}
    </button>
  );
};

export default ToggleButton;
