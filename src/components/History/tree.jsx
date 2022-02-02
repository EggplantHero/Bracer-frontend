import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getCoordinates } from "../../store/ui";
import TreeCellWrapper from "./treeCellWrapper";
import { getLevels, drawLines } from "../../utils/tree";

const Tree = ({ tree }) => {
  const canvasRef = useRef();
  const levels = getLevels(tree);
  const coords = useSelector(getCoordinates);
  const [offset, setOffset] = useState({});

  useEffect(() => {
    const newOffset = canvasRef.current.getBoundingClientRect();
    setOffset(newOffset);
  }, [canvasRef, tree]);

  useEffect(() => {
    drawLines(coords, canvasRef);
  }, [coords]);

  return (
    <div className={`container-fluid user-select-none`}>
      <div className="d-flex justify-content-center relative">
        {levels.length > 0 &&
          levels.map((level) => (
            //column
            <div
              key={level}
              className={`col-${12 / levels.length}
              d-inline-block d-flex flex-column justify-content-around text-center`}
            >
              {tree.data[level].map((poke, index) => (
                //cell
                <div key={level + index}>
                  {poke.data ? (
                    <TreeCellWrapper
                      poke={poke}
                      level={level}
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
