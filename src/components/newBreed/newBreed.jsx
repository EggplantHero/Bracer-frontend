import React from "react";
import PokeInputForm from "../pokeInputForm/pokeInputForm";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setTarget } from "../../store/target";
import { getUnlockedBreeders } from "../../store/breeders";
import { addTree } from "../../store/trees";
import { useSelector } from "react-redux";
import http from "../../services/httpService";
import { createId } from "../../utils/remap";
import { resetCoordinates } from "../../store/ui";

const NewBreedPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const breeders = useSelector(getUnlockedBreeders);

  const onEnter = async (state) => {
    dispatch(setTarget(state));
    const url = `${process.env.REACT_APP_API_URL}/api/boxbreed/`;
    const payload = JSON.stringify({ target: { data: state }, breeders });
    console.log("PAYLOAD", payload);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      console.log("POST REQUESTING:", payload);
      const { data } = await http.post(url, payload, config);
      const id = createId();
      dispatch(addTree({ data: data, id: id }));
      history.push(`/my-breeds/${id}`);
      dispatch(resetCoordinates());
    } catch (error) {
      console.log("error", error);
    }
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
