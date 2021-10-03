import axios from "axios";
import http from "../services/httpService";
import capitalize from "./capitalize";
const apiUrl = "https://pokeapi.co/api/v2";

export async function getPoke(input) {
  return await http.get(`${apiUrl}/pokemon/${input.toLowerCase()}`);
}

export async function getImg(input) {
  if (!input) return;
  const poke = await getPoke(input);
  //   const spriteUrl = poke.data.sprites.front_default; GEN 3 SPRITE
  const spriteUrl =
    poke.data.sprites.versions["generation-v"]["black-white"].animated
      .front_default;
  if (spriteUrl === null) {
    return "blank";
  }
  return spriteUrl;
}

export function getSprite(sprites, size) {
  let spriteUrl;
  if (size === "small") {
    spriteUrl = sprites.versions["generation-vii"].icons.front_default;
  } else {
    spriteUrl =
      sprites.versions["generation-v"]["black-white"].animated.front_default;
  }
  if (spriteUrl === null) {
    return "blank";
  }
  return spriteUrl;
}

export const cancelTokenSource = axios.CancelToken.source();

export async function getImgSm(input) {
  if (!input) return;
  const poke = await getPoke(input, { cancelToken: cancelTokenSource.token });
  const spriteUrl =
    poke.data.sprites.versions["generation-vii"].icons.front_default;
  if (spriteUrl === null) {
    return "blank";
  }
  return spriteUrl;
}

export async function getItemIcon(input) {
  const item = await http.get(`${apiUrl}/item/${input}`);
  const spriteUrl = item.data.sprites.default;
  return spriteUrl;
}

export async function getAllBraceIcons() {
  const braces = ["weight", "bracer", "belt", "lens", "band", "anklet"];
  const stats = ["hp", "atk", "def", "spa", "spd", "spe", "nature"];
  let urls = await Promise.all(
    braces.map(async (brace) => await getItemIcon(`power-${brace}`))
  );
  urls.push(await getItemIcon("everstone"));
  let braceObject = {};
  stats.map((stat, index) => (braceObject[stat] = urls[index]));
  return braceObject;
}

export async function getAllPokes() {
  return await http.get(`${apiUrl}/pokemon/?limit=649`);
}
export async function getAllPokeNames() {
  const { data } = await http.get(`${apiUrl}/pokemon/?limit=649`);
  return data.results.map((poke) => capitalize(poke.name));
}

export async function getNatures() {
  return await http.get(`${apiUrl}/nature?limit=25`);
}

const eggGroups = [
  { a: "monster", b: "Monster" },
  { a: "water1", b: "Water A" },
  { a: "bug", b: "Bug" },
  { a: "flying", b: "Flying" },
  { a: "ground", b: "Field" },
  { a: "fairy", b: "Fairy" },
  { a: "plant", b: "Grass" },
  { a: "humanshape", b: "Humanoid" },
  { a: "water3", b: "Water C" },
  { a: "mineral", b: "Mineral" },
  { a: "indeterminate", b: "Chaos" },
  { a: "water2", b: "Water B" },
  { a: "ditto", b: "Ditto" },
  { a: "dragon", b: "Dragon" },
  { a: "no-eggs", b: "Cannot breed" },
];

const HyphenedPokes = [
  { a: "deoxys-normal", b: "deoxys" },
  { a: "wormadam-plant", b: "wormadam" },
  { a: "giratina-altered", b: "giratina" },
  { a: "shaymin-land", b: "shaymin" },
  { a: "basculin-red-striped", b: "basculin" },
  { a: "darmanitan-standard", b: "darmanitan" },
  { a: "tornadus-incarnate", b: "tornadus" },
  { a: "thundurus-incarnate", b: "thundurus" },
  { a: "landorus-incarnate", b: "landorus" },
  { a: "keldeo-ordinary", b: "keldeo" },
  { a: "meloetta-aria", b: "meloetta" },
];

export function formatEggs(input, reverse) {
  eggGroups.forEach(
    (egg) =>
      (input = reverse
        ? input.replace(egg.b, egg.a)
        : input.replace(egg.a, egg.b))
  );
  return input;
}

export function formatName(input, reverse) {
  HyphenedPokes.forEach(
    (name) =>
      (input = reverse
        ? input.replace(name.b, name.a)
        : input.replace(name.a, name.b))
  );
  return input;
}

export async function getPokemonSpecies(name) {
  const { data } = await http.get(
    `${apiUrl}/pokemon-species/${formatName(name.toLowerCase())}`
  );
  return data;
}

export async function findEggGroup(data) {
  if (!data) return;
  const newEggGroups = data.egg_groups.map((group) => formatEggs(group.name));
  return newEggGroups;
}

export function parseGenderRate(rate) {
  switch (rate) {
    case -1:
      return ["genderless"];
    case 0:
      return ["male"];
    case 8:
      return ["female"];
    default:
      return ["male", "female"];
  }
}
