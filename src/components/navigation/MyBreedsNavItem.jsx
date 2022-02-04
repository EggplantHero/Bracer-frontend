import React from "react";
import { useSelector } from "react-redux";
import { summarizeIvs, getTargetFromTree } from "../../utils/remap";
import capitalize from "../../utils/capitalize";
import { getCache } from "../../store/pokeapi";

const MyBreedsNavItem = ({ tree }) => {
  const cache = useSelector(getCache);
  const target = getTargetFromTree(tree);
  const { name, ivs } = target;

  return (
    <div className="mx-5">
      <div className="d-flex justify-content-start">
        <div>
          <img src={cache[name].spriteSm} alt="" />
        </div>
        <span>{capitalize(name)}</span>
      </div>
      <div className="d-flex justify-content-center">
        <span>{summarizeIvs(ivs)}</span>
      </div>
    </div>
  );
};

export default MyBreedsNavItem;
