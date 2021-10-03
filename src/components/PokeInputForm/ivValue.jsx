import React, { useContext } from "react";
import FormContext from "../../contexts/formContext";
import { HiOutlineBan } from "react-icons/hi";
import { getIvColor } from "../../utils/remap";

const IvValue = ({ stat }) => {
  const [formState] = useContext(FormContext);
  const iv = formState.ivs[stat];
  return (
    <label htmlFor="stat" style={{ color: getIvColor(iv, true) }}>
      {iv === -1 ? <HiOutlineBan /> : iv}
    </label>
  );
};

export default IvValue;
