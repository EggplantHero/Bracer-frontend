import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getCoordinates } from "../../store/ui";
import TreeCellWrapper from "./treeCellWrapper";
import { getLevels, drawLines } from "../../utils/tree";
import { saveCoordinates } from "../../store/ui";
import { useDispatch } from "react-redux";
import { VscChromeMinimize, VscExpandAll } from "react-icons/vsc";

const Tree = ({ tree }) => {
  const dispatch = useDispatch();
  const canvasRef = useRef();
  const levels = getLevels(tree);
  const coords = useSelector(getCoordinates);
  const [offset, setOffset] = useState({});
  const [collapseLevel, setCollapseLevel] = useState(0);

  useEffect(() => {
    const newOffset = canvasRef.current.getBoundingClientRect();
    setOffset(newOffset);
  }, [canvasRef, tree]);

  useEffect(() => {
    drawLines(coords, canvasRef, tree);
  }, [coords, offset]);

  const saveCoords = (coords, level, index, offset) => {
    dispatch(saveCoordinates({ coords, level, index, offset }));
  };

  const handleCollapse = (level) => {
    if (collapseLevel >= level) {
      setCollapseLevel(level - 1);
    } else {
      setCollapseLevel(level);
    }
  };

  const collapsed = (level) => {
    return collapseLevel >= level;
  };

  return (
    <div className={`container-fluid user-select-none`}>
      <div className="d-flex justify-content-center relative">
        {levels.length > 0 &&
          levels.map((level) => (
            <div
              key={level}
              className={`col-${12 / levels.length}
              d-inline-block d-flex flex-column justify-content-between text-center`}
            >
              <button
                className="btn btn-secondary mx-auto"
                onClick={() => handleCollapse(level)}
              >
                <span>
                  {collapsed(level) ? <VscExpandAll /> : <VscChromeMinimize />}
                </span>
              </button>
              {tree.data[level].map((poke, index) => (
                //cell
                <div key={level + index}>
                  {poke.data && (
                    <TreeCellWrapper
                      poke={poke}
                      level={level}
                      index={index}
                      treeid={tree.id}
                      offset={offset}
                      collapseLevel={collapseLevel}
                      collapsed={collapsed(level)}
                      saveCoords={saveCoords}
                    ></TreeCellWrapper>
                  )}
                </div>
              ))}
              <br />
            </div>
          ))}
        <canvas className="canvas" ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default Tree;
