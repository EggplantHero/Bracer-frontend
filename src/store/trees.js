import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "Trees",
  initialState: [],
  reducers: {
    reorderTrees: (trees, action) => {
      return (trees = action.payload);
    },
    addTree: (trees, action) => {
      trees.push({
        id: action.payload.id,
        data: action.payload.data,
      });
    },
    removeTree: (trees, action) => {
      return trees.filter((tree) => tree.id !== action.payload);
    },
    removeTrees: (trees, action) => {
      return trees.filter((tree) => action.payload.includes(tree.id));
    },
    editBreeder: (trees, action) => {
      const { level, index, treeId } = action.payload;
      const tree = trees.find((tree) => {
        return tree.id === treeId;
      });
      tree.data[level][index].data.breeder =
        !tree.data[level][index].data.breeder;
    },
  },
});

export const getTrees = createSelector(
  (state) => state.entities.trees,
  (trees) => trees
);

export default slice.reducer;
export const { reorderTrees, addTree, removeTree, editBreeder } = slice.actions;
