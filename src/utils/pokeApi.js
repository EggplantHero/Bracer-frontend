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

export const heldItems = {
  "power-weight": "hp",
  "power-bracer": "atk",
  "power-belt": "def",
  "power-lens": "spa",
  "power-band": "spd",
  "power-anklet": "spe",
  everstone: "nature",
};

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
