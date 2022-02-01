import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import TreeCell from "./treeCell";
import { getCoordinates } from "../../utils/tree";
import { saveCoordinates } from "../../store/ui";

const TreeCellWrapper = ({ poke, level, levels, treeid, index, offset }) => {
  const boxRef = useRef();
  const dispatch = useDispatch();
  const { breeder } = poke.data;

  useEffect(() => {
    const coords = getCoordinates(boxRef);
    console.log(coords, level, index);
    dispatch(saveCoordinates({ coords, level, index, offset }));
  }, [levels]);

  return (
    <div
      ref={boxRef}
      className={`card treeCell ${breeder && "treeCellBg"} mx-auto`}
    >
      <TreeCell
        poke={poke}
        level={level}
        index={index}
        treeId={treeid}
      ></TreeCell>
    </div>
  );
};

export default TreeCellWrapper;
