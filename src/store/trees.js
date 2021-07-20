import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import exampleTree from "../utils/exampleTree.json";

const slice = createSlice({
  name: "Trees",
  initialState: [exampleTree],
  reducers: {
    reorderTrees: (trees, action) => {
      return (trees = action.payload);
    },
    addTree: (trees, action) => {
      trees.push({
        id: Date.now() + Math.floor(Math.random() * 100),
        data: action.payload,
      });
    },
    removeTree: (trees, action) => {
      return trees.filter((tree) => tree.id !== action.payload);
    },
    removeTrees: (trees, action) => {
      return trees.filter((tree) => action.payload.includes(tree.id));
    },
  },
});

export const getTrees = createSelector(
  (state) => state.entities.trees,
  (trees) => trees
);

export default slice.reducer;
export const { reorderTrees, addTree, removeTree } = slice.actions;
