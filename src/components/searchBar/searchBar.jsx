import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useSelector } from "react-redux";
import { getCache } from "../../store/pokeapi";
import capitalize from "../../utils/capitalize";

const SearchBar = ({ handleChange, size }) => {
  const cache = useSelector(getCache);
  const options = Object.keys(cache).map((name) => capitalize(name));

  return (
    <div className={`mx-auto ${size && `col-${size}`}`} spellCheck="false">
      <Typeahead
        id="typeahead"
        placeholder="Name..."
        minLength={2}
        highlightOnlyResult
        onChange={(selected) => {
          handleChange(selected);
        }}
        options={options}
      ></Typeahead>
    </div>
  );
};

export default SearchBar;
