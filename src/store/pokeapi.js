import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import {
  formatName,
  formatEggs,
  parseGenderRate,
  getSprite,
} from "../utils/pokeApi";

//slice

const slice = createSlice({
  name: "pokeapi",
  initialState: {
    allPokes: {},
    itemUrls: [],
    itemIcons: {},
    loading: false,
  },
  reducers: {
    addPoke: (pokes, action) => {
      const { name, egg_groups, gender_rate } = action.payload;
      const poke = pokes.allPokes[name];
      const eggGroups = egg_groups.map((egg) => formatEggs(egg.name));
      Object.assign(poke, {
        eggGroups,
        possibleGenders: parseGenderRate(gender_rate),
        loaded: { ...poke.loaded, api1: true },
      });
    },
    addPokeSprite: (pokes, action) => {
      const { name, sprites } = action.payload;
      const poke = pokes.allPokes[formatName(name)];
      Object.assign(poke, {
        sprite: getSprite(sprites, "normal"),
        spriteSm: getSprite(sprites, "small"),
        loaded: { ...poke.loaded, api2: true },
      });
    },
    addOptions: (pokes, action) => {
      const { results } = action.payload;
      const allPokeNames = results.map((poke) => formatName(poke.name));
      allPokeNames.forEach((name) =>
        Object.assign(pokes.allPokes, {
          [name]: { name, loaded: { api1: false, api2: false } },
        })
      );
    },
    addBraces: (pokes, action) => {
      const { itemUrls, itemIcons } = pokes;
      itemUrls.push(action.payload.sprites.default);
      if (itemUrls.length === 7) {
        const stats = ["hp", "atk", "def", "spa", "spd", "spe", "nature"];
        stats.map((stat, index) => (itemIcons[stat] = itemUrls[index]));
        delete pokes.itemUrls;
      }
    },
  },
});

export default slice.reducer;
export const { addPoke, addPokeSprite, addOptions, addBraces } = slice.actions;

//actions

export const initializeState = () => (dispatch, getState) => {
  if (Object.keys(getState().pokeapi.allPokes).length === 0) {
    dispatch(
      apiCallBegan({
        url: `/pokemon/?limit=649`,
        onSuccess: addOptions.type,
      })
    );
  }
  if (Object.keys(getState().pokeapi.itemIcons).length === 0) {
    const braces = ["weight", "bracer", "belt", "lens", "band", "anklet"];
    braces.map((brace) =>
      dispatch(
        apiCallBegan({
          url: `/item/power-${brace}`,
          onSuccess: addBraces.type,
        })
      )
    );
    dispatch(
      apiCallBegan({
        url: `/item/everstone`,
        onSuccess: addBraces.type,
      })
    );
  }
};

export const fetchData = (pokeName) => (dispatch, getState) => {
  const { allPokes } = getState().pokeapi;
  if (!allPokes[pokeName].eggGroups) {
    dispatch(
      apiCallBegan({
        url: `/pokemon-species/${pokeName}`,
        onSuccess: addPoke.type,
      })
    );
  }
  if (!allPokes[pokeName].sprite) {
    dispatch(
      apiCallBegan({
        url: `/pokemon/${formatName(pokeName, true)}`,
        onSuccess: addPokeSprite.type,
      })
    );
  }
};

//selectors
export const getCache = createSelector(
  (state) => state.pokeapi,
  (pokeapi) => pokeapi.allPokes
);
export const getItemIcons = createSelector(
  (state) => state.pokeapi,
  (pokeapi) => pokeapi.itemIcons
);
