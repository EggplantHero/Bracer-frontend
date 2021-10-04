import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchData, getCache } from "../../store/pokeapi";
import SearchBar from "./searchBar";
import GenderSelect from "./genderSelect";
import capitalize from "../../utils/capitalize";
import PokeDisplay from "./pokeDisplay";
import PokeDisplaySm from "./pokeDisplaySm";

const SearchBarContainer = ({ small, colSize, onSearchbarChange }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [state, setState] = useState({ sprite: "", possibleGenders: [] });
  const cache = useSelector(getCache);

  const handleChange = (selected) => {
    if (!selected[0]) return;
    const name = selected[0].toLowerCase();
    setName(name);
    const { api1, api2 } = cache[name].loaded;
    if (api1 && api2) {
      setState(cache[name]);
    } else {
      dispatch(fetchData(name));
    }
  };

  useEffect(() => {
    if (name) {
      const { api1, api2 } = cache[name].loaded;
      if (api1 && api2) {
        setState(cache[name]);
      }
    }
  }, [cache]);

  useEffect(() => {
    if (!state.sprite) return;
    onSearchbarChange(state);
  }, [state]);

  return (
    <div>
      <SearchBar handleChange={handleChange} colSize={colSize} />
    </div>
  );
};

export default SearchBarContainer;
