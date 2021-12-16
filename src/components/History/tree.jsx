import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getTrees } from "../../store/trees";
import { resetCoordinates, getCoordinates } from "../../store/ui";
import TreeCellWrapper from "./treeCellWrapper";
import {
  getLevels,
  getTreeById,
  container,
  drawLines,
  offsetCoords,
} from "../../utils/tree";
import { useDispatch } from "react-redux";
import TreeCell from "./treeCell";

const Tree = ({ treeid }) => {
  const dispatch = useDispatch();
  const trees = useSelector(getTrees);
  const coords = useSelector(getCoordinates);
  const [tree, setTree] = useState({});
  const [levels, setLevels] = useState([]);
  const canvasRef = useRef();
  const [offset, setOffset] = useState({});

  useEffect(() => {
    const newOffset = canvasRef.current.getBoundingClientRect();
    setOffset(newOffset);
  }, [canvasRef, tree]);

  useEffect(() => {
    const currenttree = getTreeById(trees, treeid);
    console.log("SETTING TREE, SETTING LEVELS");
    setTree(currenttree);
    setLevels(getLevels(currenttree));
    // }, [treeid, trees, tree]);
  }, [treeid]);

  useEffect(() => {
    if (Object.keys(coords).length) {
      console.log("useEffect[coords], rendering lines...", coords);
      drawLines(coords, canvasRef);
    }
  }, [coords]);

  return (
    <div className={`${container(levels || [])} user-select-none`}>
      <div className="d-flex justify-content-center relative">
        {levels.length > 0 &&
          levels.map((level) => (
            //column
            <div
              key={level}
              className={`col-${
                12 / levels.length
              } d-inline-block d-flex flex-column justify-content-around text-center`}
            >
              {tree.data[level].map((poke, index) => (
                //cell
                <div key={level + index}>
                  {poke.data ? (
                    <TreeCellWrapper
                      poke={poke}
                      level={level}
                      levels={levels}
                      index={index}
                      treeid={tree.id}
                      offset={offset}
                    ></TreeCellWrapper>
                  ) : (
                    <div className="card treeCell treeCellBg"></div>
                  )}
                </div>
              ))}
            </div>
          ))}
        <canvas className="canvas" ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default Tree;
