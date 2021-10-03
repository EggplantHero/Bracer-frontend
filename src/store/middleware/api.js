import axios from "axios";
import * as actions from "../api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);
    next(action);
    //this middleware is only used if action type is apiCallBegan

    const { url, method, data, onSuccess, onError } = action.payload;

    try {
      const response = await axios.request({
        baseURL: "https://pokeapi.co/api/v2",
        url,
        method,
        data,
      });
      //success
      //general
      dispatch(actions.apiCallSuccess(response.data));
      //specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
      return response.data;
    } catch (error) {
      //failure
      //general
      dispatch(actions.apiCallFailed(error.message));
      //specific
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

export default api;
