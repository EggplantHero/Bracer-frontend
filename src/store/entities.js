import { combineReducers } from "redux";
import target from "./target";
import breeders from "./breeders";
import trees from "./trees";

export default combineReducers({ target, breeders, trees });
