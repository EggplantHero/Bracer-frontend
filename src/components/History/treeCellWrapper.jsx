import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import TreeCell from "./treeCell";
import { getCoordinates } from "../../utils/tree";
import { saveCoordinates, resetCoordinates } from "../../store/ui";

const TreeCellWrapper = ({ poke, level, levels, treeid, index, offset }) => {
  const boxRef = useRef();
  const dispatch = useDispatch();
  const { breeder } = poke.data;

  //   useEffect(() => {
  //     dispatch(resetCoordinates());
  //   }, [levels.length]);

  useEffect(() => {
    const coords = getCoordinates(boxRef);
    console.log(coords, level, index);
    dispatch(saveCoordinates({ coords, level, index, offset }));
  }, [breeder]);

  return (
    <div ref={boxRef} className={`card treeCell ${breeder && "treeCellBg"}`}>
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
