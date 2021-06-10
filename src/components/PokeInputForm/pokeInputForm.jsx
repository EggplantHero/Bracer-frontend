import React, { useEffect, useState } from "react";
import FormContext from "../../contexts/formContext";
import { initialState, schema, validate } from "../../services/pokeInputForm";
import { HiOutlineBan } from "react-icons/hi";
import SearchBar from "./searchBar";
import PokeDisplay from "./pokeDisplay";
import IvSelection from "./ivSelect";
import GenderSelect from "./genderSelect";

const PokeInputForm = ({ onEnter }) => {
  const state = useState(initialState);
  const [valid, setValid] = useState(false);
  const [formState] = state;

  useEffect(() => {
    const valid = validate(formState, schema);
    setValid(valid);
  }, [formState]);

  const handleSubmit = () => {
    if (onEnter === undefined) {
      console.log("submit button callback (via onEnter prop) not implemented.");
    } else {
      onEnter(formState);
    }
  };

  return (
    <FormContext.Provider value={state}>
      <div className="card p-5">
        <SearchBar></SearchBar>
        <PokeDisplay></PokeDisplay>
        <GenderSelect></GenderSelect>
        <IvSelection></IvSelection>
        <p className="mt-2">
          Stats that you do not wish to specify can be set to "<HiOutlineBan />
          ".
        </p>
        <div className="mt-4">
          <button
            className="btn btn-submit"
            disabled={!valid}
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
        </div>
        {/* FOOTNOTE */}
      </div>
    </FormContext.Provider>
  );
};

export default PokeInputForm;
