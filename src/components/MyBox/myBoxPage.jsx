import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBreeder, removeBreeders } from "../../store/breeders";
import { getSelectedIds, getSelectedTool, setSelectedId } from "../../store/ui";
import PokeInputForm from "../pokeInputForm/pokeInputForm";
import BreederBoxes from "./breederBoxes";
import BreederInspect from "./breederInspect";

const MyBoxPage = () => {
  const dispatch = useDispatch();
  const selectedIds = useSelector(getSelectedIds);
  const selectedTool = useSelector(getSelectedTool);
  console.log(selectedIds);

  const onEnter = (state) => {
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
            <BreederBoxes></BreederBoxes>
            {selectedTool === "inspect" && <BreederInspect></BreederInspect>}
            {selectedTool === "delete" && (
              <button
                className="btn btn-danger"
                onClick={() => {
                  dispatch(removeBreeders(selectedIds));
                  dispatch(setSelectedId(null));
                }}
              >
                Confirm Delete ({selectedIds.length}) items
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBoxPage;
