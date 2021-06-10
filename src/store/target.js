import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

//SLICE
const slice = createSlice({
  name: "target",
  initialState: { data: {} },
  reducers: {
    setTarget: (target, action) => {
      target.data = action.payload;
    },
    resetTarget: (target) => {
      target.data = {};
    },
  },
});

export const getTarget = createSelector(
  (state) => state.entities.target,
  (target) => target
);

export const getJson = createSelector(
  (state) => state.entities,
  (entities) => JSON.stringify(entities)
);

export default slice.reducer;
export const { setTarget, resetTarget } = slice.actions;
