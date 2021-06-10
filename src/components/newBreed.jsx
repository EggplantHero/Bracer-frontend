import React from "react";
import PokeInputForm from "./PokeInputForm/pokeInputForm";
import { useDispatch } from "react-redux";
import { getJson, setTarget } from "../store/target";
import { useSelector } from "react-redux";

const NewBreedPage = () => {
  const json = useSelector(getJson);
  const dispatch = useDispatch();
  const onEnter = (state) => {
    dispatch(setTarget(state));
    console.log(json);
  };

  return (
    <div className="container user-select-none text-center">
      <div className="col-lg-6 col-md-8 mx-auto">
        {/* HEADERS */}
        <p className="my-4">New Breed</p>
        <p>Please specify the Pokemon you would like to breed as your goal:</p>
        <PokeInputForm onEnter={onEnter}></PokeInputForm>
      </div>
    </div>
  );
};

export default NewBreedPage;
