import React, { useEffect, useRef, useState } from "react";
import TreeCell from "./treeCell";
import TreeCellMini from "./treeCellMini";
import _ from "lodash";
import { getCoordinates } from "../../utils/tree";

const TreeCellWrapper = ({
  poke,
  level,
  treeid,
  index,
  offset,
  collapsed,
  collapseLevel,
  saveCoords,
}) => {
  const boxRef = useRef();
  const { breeder } = poke.data;

  useEffect(() => {
    console.log("relogging ", level, index);
    console.log("collapsed ", collapsed);
    const coords = getCoordinates(boxRef);
    saveCoords(coords, level, index, offset);
  }, [treeid, offset, collapsed, collapseLevel]);

  return (
    <div
      ref={boxRef}
      className={`card ${collapsed ? "treeCellMini" : "treeCell"} mx-auto ${
        breeder && "treeCellBg"
      }`}
    >
      {collapsed ? (
        <TreeCellMini poke={poke}></TreeCellMini>
      ) : (
        <TreeCell
          poke={poke}
          level={level}
          index={index}
          treeId={treeid}
        ></TreeCell>
      )}
    </div>
  );
};

export default TreeCellWrapper;

// const [dimensions, setDimensions] = useState({
//   height: window.innerHeight,
//   width: window.innerWidth,
// });

// useEffect(() => {
//   const handleResize = () => {
//     setDimensions({
//       height: window.innerHeight,
//       width: window.innerWidth,
//     });
//     console.log("resized to: ", window.innerWidth, "x", window.innerHeight);
//   };

//   window.addEventListener("resize", handleResize);

//   return (_) => {
//     window.removeEventListener("resize", handleResize);
//   };
// });
