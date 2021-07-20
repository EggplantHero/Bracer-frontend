import React, { useContext, useEffect, useState } from "react";
import FormContext from "../../contexts/formContext";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import {
  getAllPokeNames,
  getPokemonSpecies,
  findEggGroup,
  getGenders,
} from "../../utils/pokeApi";

const SearchBar = () => {
  const [formState, setFormState] = useContext(FormContext);
  const [allPokes, setAllPokes] = useState([]);
  const [selected, setSelected] = useState([]);
  const getPokes = async () => {
    setAllPokes(await getAllPokeNames());
  };

  useEffect(() => {
    getPokes();
  }, []);

  const handleChange = async (input) => {
    if (selected[0] === input[0]) return;
    if (input.length === 0) return;
    setSelected(input);
    const data = await getPokemonSpecies(input[0]);
    const eggGroups = await findEggGroup(data);
    const possibleGenders = await getGenders(data);
    setFormState({
      ...formState,
      eggGroups,
      possibleGenders,
      gender: possibleGenders[0],
      name: input[0],
    });
  };

  return (
    <div className="col-4 mx-auto" spellCheck="false">
      <Typeahead
        id="typeahead"
        placeholder="Name..."
        minLength={2}
        highlightOnlyResult
        onChange={(selected) => {
          handleChange(selected);
        }}
        options={allPokes}
      ></Typeahead>
    </div>
  );
};

export default SearchBar;
