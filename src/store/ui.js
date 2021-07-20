import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "ui",
  initialState: {
    page: 1,
    dark: "light",
    expanded: false,
  },
  reducers: {
    toggleDarkMode: (ui) => {
      ui.dark = ui.dark === "light" ? "dark" : "light";
    },
    collapseSidebar: (ui) => {
      ui.expanded = !ui.expanded;
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

export default slice.reducer;
export const { toggleDarkMode, collapseSidebar } = slice.actions;
