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
      breeders.push({
        id: Date.now() + Math.floor(Math.random() * 100),
        data: action.payload,
        locked: false,
      });
    },
    removeBreeder: (breeders, action) => {
      return breeders.filter((breeder) => breeder.id !== action.payload);
    },
    removeBreeders: (breeders, action) => {
      return breeders.filter((breeder) => !action.payload.includes(breeder.id));
    },
    toggleLock: (breeders, action) => {
      const breeder = breeders.find((breeder) => breeder.id === action.payload);
      breeder.locked = !breeder.locked;
    },
  },
});

export const getBreeders = createSelector(
  (state) => state.entities.breeders,
  (breeders) => breeders
);

export const getUnlockedBreeders = createSelector(
  (state) => state.entities.breeders,
  (breeders) => breeders.filter((breeder) => breeder.locked === false)
);

export default slice.reducer;
export const {
  reorderBreeders,
  addBreeder,
  removeBreeder,
  removeBreeders,
  toggleLock,
} = slice.actions;
