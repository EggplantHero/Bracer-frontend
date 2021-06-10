import React, { useContext } from "react";
import FormContext from "../../contexts/formContext";
import { HiOutlineBan } from "react-icons/hi";

const IvValue = ({ stat }) => {
  const [formState] = useContext(FormContext);
  return (
    <label htmlFor="stat">
      {formState.ivs[stat] === -1 ? (
        <HiOutlineBan style={{ color: "tomato" }} />
      ) : (
        formState.ivs[stat]
      )}
    </label>
  );
};

export default IvValue;
