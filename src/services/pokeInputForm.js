import Joi from "joi-browser";

export const initialState = {
  name: "",
  ivs: {
    hp: 31,
    atk: 31,
    def: 31,
    spa: 31,
    spd: 31,
    spe: 31,
  },
  nature: { value: "adamant", active: true },
  eggGroups: [],
  gender: "",
  possibleGenders: [],
  breeder: true,
};

export const schema = {
  name: Joi.string().required(),
  ivs: Joi.object({
    hp: Joi.number().integer().min(-1).max(31),
    atk: Joi.number().integer().min(-1).max(31),
    def: Joi.number().integer().min(-1).max(31),
    spa: Joi.number().integer().min(-1).max(31),
    spd: Joi.number().integer().min(-1).max(31),
    spe: Joi.number().integer().min(-1).max(31),
  }),
  nature: Joi.object({
    value: Joi.string().required(),
    active: Joi.boolean(),
  }),
  eggGroups: Joi.array().items(Joi.string()).max(2),
  gender: Joi.string().required(),
  possibleGenders: Joi.array().items(Joi.string()).max(3),
  breeder: Joi.boolean().valid(true),
};

export const validate = (state, schema) => {
  const result = Joi.validate(state, schema, { abortEarly: false });

  if (!result.error) return true;
  return false;
};
