import React from "react";
import PokeInputForm from "./PokeInputForm/pokeInputForm";
import { useDispatch } from "react-redux";
import { getJson, setTarget } from "../store/target";
import { getBreeders } from "../store/breeders";
import { addTree } from "../store/trees";
import { useSelector } from "react-redux";
import http from "../services/httpService";

const NewBreedPage = () => {
  const dispatch = useDispatch();
  // const json = useSelector(getJson);
  const breeders = useSelector(getBreeders);

  const onEnter = async (state) => {
    dispatch(setTarget(state));
    //TODO: change hardcoded url to env
    // const url = `${process.env.REACT_APP_API_URL}/api/boxbreed/`;
    const url = `https://bracer.app/api/boxbreed/`;
    const payload = JSON.stringify({ target: { data: state }, breeders });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const { data } = await http.post(url, payload, config);
    console.log("RESPONSE:", data);
    dispatch(addTree(data));
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
