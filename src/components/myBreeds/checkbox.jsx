import React from "react";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";

const Checkbox = ({ onClick, bool }) => {
  return (
    <div>
      <button className="btn" onClick={onClick}>
        Completed: {bool ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
      </button>
    </div>
  );
};

export default Checkbox;
