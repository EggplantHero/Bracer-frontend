import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "ui",
  initialState: {
    page: 1,
    dark: "light",
    expanded: false,
    selectedIds: [],
    selectedTool: "inspect",
  },
  reducers: {
    toggleDarkMode: (ui) => {
      ui.dark = ui.dark === "light" ? "dark" : "light";
    },
    collapseSidebar: (ui) => {
      ui.expanded = !ui.expanded;
    },
    addSelectedId: (ui, action) => {
      ui.selectedIds.push(action.payload);
    },
    removeSelectedId: (ui, action) => {
      const filtered = ui.selectedIds.filter((id) => action.payload !== id);
      ui.selectedIds = filtered;
    },
    setSelectedId: (ui, action) => {
      if (action.payload === null) {
        ui.selectedIds = [];
      } else ui.selectedIds = [action.payload];
    },
    setSelectedTool: (ui, action) => {
      ui.selectedTool = action.payload;
    },
  },
});

export const getMode = createSelector(
  (state) => state.ui,
  (ui) => ui.dark
);
export const getSidebar = createSelector(
  (state) => state.ui,
  (ui) => ui.expanded
);
export const getSelectedIds = createSelector(
  (state) => state.ui,
  (ui) => ui.selectedIds
);
export const getSelectedTool = createSelector(
  (state) => state.ui,
  (ui) => ui.selectedTool
);

export default slice.reducer;
export const {
  toggleDarkMode,
  collapseSidebar,
  addSelectedId,
  removeSelectedId,
  setSelectedId,
  setSelectedTool,
} = slice.actions;
