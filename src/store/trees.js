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
    toggleBreeder: (trees, action) => {
      const { level, index, treeId } = action.payload;
      const tree = trees.find((tree) => {
        return tree.id === treeId;
      });
      tree.data[level][index].data.breeder =
        !tree.data[level][index].data.breeder;
    },
    editBreeder: (trees, action) => {
      const { level, index, treeId, name, gender } = action.payload;
      const tree = trees.find((tree) => {
        return tree.id === treeId;
      });
      if (name) tree.data[level][index].data.name = name;
      if (gender) tree.data[level][index].data.gender = gender;
    },
  },
});

export const getTrees = createSelector(
  (state) => state.entities.trees,
  (trees) => trees
);

export default slice.reducer;
export const { reorderTrees, addTree, removeTree, toggleBreeder, editBreeder } =
  slice.actions;
