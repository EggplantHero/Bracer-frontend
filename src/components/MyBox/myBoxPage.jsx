import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBreeder } from "../../store/breeders";
import PokeInputForm from "../PokeInputForm/pokeInputForm";
import BreederBoxes from "./breederBoxes";
import BreederInspect from "./breederInspect";

const MyBoxPage = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [config, setConfig] = useState(false);

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
            <BreederBoxes
              setSelected={setSelected}
              config={config}
            ></BreederBoxes>
            <BreederInspect selected={selected}></BreederInspect>
            <button
              className="btn btn-danger"
              onClick={() => setConfig(!config)}
            >
              Mass Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBoxPage;
