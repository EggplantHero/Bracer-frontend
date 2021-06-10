import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "breeders",
  initialState: [],
  reducers: {
    reorderBreeders: (breeders, action) => {
      return (breeders = action.payload);
    },
    addBreeder: (breeders, action) => {
      breeders.push({ id: Date.now(), data: action.payload });
    },
    removeBreeder: (breeders, action) => {
      return breeders.filter((breeder) => breeder.id !== action.payload);
    },
  },
});

export const getBreeders = createSelector(
  (state) => state.entities.breeders,
  (breeders) => breeders
);

export default slice.reducer;
export const { reorderBreeders, addBreeder, removeBreeder } = slice.actions;
