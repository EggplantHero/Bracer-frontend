import React, { useContext } from "react";
import FormContext from "../../contexts/formContext";
import InputRange from "./inputRange";
import BraceIcon from "./braceIcon";
import IvValue from "./ivValue";

const IvSelect = () => {
  const [formState] = useContext(FormContext);
  const ivs = Object.keys(formState.ivs);
  return (
    <div className="mx-auto col-12">
      {ivs.map((stat) => (
        <div key={stat} className="form-group">
          <div className="input-group my-3">
            <div className="col-2">
              <BraceIcon stat={stat} />
            </div>
            <div className="col-8">
              <InputRange stat={stat} />
            </div>
            <div className="col-2">
              <IvValue stat={stat} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IvSelect;
