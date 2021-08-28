import React from "react";
import PokeInputForm from "./PokeInputForm/pokeInputForm";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setTarget } from "../store/target";
import { getBreeders } from "../store/breeders";
import { addTree, getTrees } from "../store/trees";
import { useSelector } from "react-redux";
import http from "../services/httpService";
import { createId } from "../utils/remap";

const NewBreedPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const trees = useSelector(getTrees);
  console.log("TREES", JSON.stringify(trees));
  const breeders = useSelector(getBreeders);

  const onEnter = async (state) => {
    dispatch(setTarget(state));
    //TODO: change hardcoded url to env
    const url = `${process.env.REACT_APP_API_URL}/api/boxbreed/`;
    // const url = `https://bracer.app/api/boxbreed/`;
    const payload = JSON.stringify({ target: { data: state }, breeders });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    console.log("POST REQUESTING:", payload);
    const { data } = await http.post(url, payload, config);
    console.log("RESPONSE:", data);

    const id = createId();
    dispatch(addTree({ data: data, id: id }));
    history.push(`/history/${id}`);
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
