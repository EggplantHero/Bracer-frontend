import { FaMars, FaVenus, FaGenderless } from "react-icons/fa";

export const genderIcons = {
  male: { icon: <FaMars />, color: "rgb(90,193,254)" },
  female: { icon: <FaVenus />, color: "rgb(255,108,226)" },
  genderless: { icon: <FaGenderless />, color: "grey" },
};

export function mapBreederSchema(object) {
  const { name, hp, atk, def, spa, spd, spe, nature, eggGroups, gender } =
    object;
  const breederSchema = {
    name,
    ivs: {
      hp,
      atk,
      def,
      spa,
      spd,
      spe,
    },
    nature,
    gender,
    eggGroups,
    breeder: true,
  };
  return breederSchema;
}

function comparator(state, stat) {
  const { active, data } = state.data.target;
  if (active[stat]) {
    return data[stat];
  }
  return false;
}

export function convertToJSON(state) {
  const { target, breeders } = state.data;
  const { name, nature, breeder } = target.data;
  const stats = ["hp", "atk", "def", "spa", "spd", "spe"];
  const schema = {
    target: {
      name,
      ivs: {},
      nature,
      breeder,
    },
    breeders: breeders,
  };
  stats.map((stat) => (schema.target.ivs[stat] = comparator(state, stat)));
  const result = JSON.stringify(schema);
  return result;
}

export function ivClass(iv) {
  switch (iv) {
    case 31:
      return "green";
    case 0:
      return "red";
    default:
      break;
  }
}

const countIvs = (num, ivs) => {
  let count = 0;
  for (const iv in ivs) {
    if (ivs[iv] === num) {
      count++;
    }
  }
  return count;
};

export const summarizeIvs = (ivs) => {
  const values = [31, 30, 0];
  const results = { 31: 0, 30: 0, 0: 0 };
  values.map((value) => (results[value] = countIvs(value, ivs)));
  let string = ``;
  values.forEach((value) => {
    if (results[value] !== 0) {
      string += `${results[value]}x${value} `;
    }
  });
  return string;
};

export const getTargetFromTree = (tree) => {
  return tree.data[Object.keys(tree.data).length][0].data;
};

export const createId = () => {
  return Date.now() + Math.floor(Math.random() * 100);
};

export const statColors = {
  hp: "rgb(81, 200, 91)",
  atk: "rgb(236, 109, 112)",
  def: "rgb(231,174,101)",
  spa: "rgb(242,97,244)",
  spd: "rgb(233,222,106)",
  spe: "rgb(103,209,232)",
};
