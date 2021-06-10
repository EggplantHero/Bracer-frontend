import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBreeder } from "../../store/breeders";
import PokeInputForm from "../PokeInputForm/pokeInputForm";
import BreederBoxes from "./breederBoxes";
import BreederInspect from "./breederInspect";

const MyBoxPage = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const onEnter = (state) => {
    setSelected(state);
    dispatch(addBreeder(state));
  };

  return (
    <div className="user-select-none text-center">
      <p className="my-4">My Box</p>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <p>Add a breeder to your box:</p>
            <PokeInputForm onEnter={onEnter}></PokeInputForm>
          </div>
          <div className="col-12 col-lg-6">
            <p>Your box contents:</p>
            <BreederBoxes setSelected={setSelected}></BreederBoxes>
            <BreederInspect selected={selected}></BreederInspect>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBoxPage;
