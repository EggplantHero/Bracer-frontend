import React, { useEffect, useState } from "react";
import { summarizeIvs, getTargetFromTree } from "../utils/remap";
import { getImgSm } from "../utils/pokeApi";

const HistoryNavItem = ({ tree }) => {
  const [target, setTarget] = useState({});
  const [img, setImg] = useState("");

  useEffect(() => {
    setTarget(getTargetFromTree(tree));
    const fetchImg = async () => {
      const url = await getImgSm(target.name);
      setImg(url);
    };
    fetchImg(target.name);
  }, [target, tree]);

  return (
    <div className="mx-5">
      <div className="d-flex justify-content-start">
        <div>
          <img src={img} alt="" />
        </div>
        <span>{target.name}</span>
      </div>
      <div className="d-flex justify-content-center">
        <span>{summarizeIvs(target.ivs)}</span>
      </div>
    </div>
  );
};

export default HistoryNavItem;
