import { combineReducers } from "redux";
import entities from "./entities";
import ui from "./ui";
import pokeapi from "./pokeapi";

export default combineReducers({ entities, ui, pokeapi });
