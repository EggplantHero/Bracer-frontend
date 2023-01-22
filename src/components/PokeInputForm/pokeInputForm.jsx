import React, { useEffect, useState } from "react";
import { initialState, schema, validate } from "../../services/pokeInputForm";
import { HiOutlineBan } from "react-icons/hi";
import IvSelection from "./ivSelect";
import SearchBarContainer from "../searchBar/searchBarContainer";
import PokeDisplay from "../searchBar/pokeDisplay";
import GenderSelect from "../searchBar/genderSelect";
import { useSelector } from "react-redux";
import { getCache } from "../../store/pokeapi";
import FormContext from "../../contexts/formContext";

const PokeInputForm = ({ onEnter, prevent6x }) => {
  const cache = useSelector(getCache);
  const state = useState(initialState);
  const [formState, setFormState] = state;
  const { name, gender } = formState;
  const [valid, setValid] = useState(false);

  useEffect(() => {
    var valid = validate(formState, schema);
    valid = valid && valid6x();
    setValid(valid);
  }, [formState]);

  const resetForm = () => {
    setFormState({
      ...formState,
      ivs: initialState.ivs,
      gender: cache[name].possibleGenders[0],
    });
  };

  const handleSubmit = () => {
    if (onEnter === undefined) {
      console.log("submit button callback (via onEnter prop) not implemented.");
    } else {
      onEnter(formState);
    }
    resetForm();
  };

  const onSearch = (data) => {
    const { name, eggGroups, possibleGenders } = data;
    setFormState({
      ...formState,
      name,
      eggGroups,
      gender: possibleGenders[0],
    });
  };

  const onGenderSelect = (data) => {
    setFormState({
      ...formState,
      gender: data,
    });
  };

  var valid6x = () => {
    if (!prevent6x) return true;
    for (const property in formState.ivs) {
      if (formState.ivs[property] == -1) return true;
    }
    return false;
  };

  return (
    <FormContext.Provider value={state}>
      <div className="card p-5">
        <SearchBarContainer size={6} onSearch={onSearch} />
        <PokeDisplay name={name} />
        {name && (
          <GenderSelect
            onGenderSelect={onGenderSelect}
            selectedGender={gender}
            possibleGenders={cache[name].possibleGenders}
          ></GenderSelect>
        )}
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
      </div>
    </FormContext.Provider>
  );
};

export default PokeInputForm;
