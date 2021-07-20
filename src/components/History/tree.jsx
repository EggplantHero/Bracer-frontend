import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrees } from "../../store/trees";
import TreeCell from "./treeCell";

const Tree = () => {
  const dispatch = useDispatch();
  const trees = useSelector(getTrees);
  const canvasRef = useRef(null);
  const [tree] = trees;

  useEffect(() => {
    console.log(tree);
  });

  const levels = Object.keys(tree);

  return (
    <div>
      <div className="user-select-none">
        <h6 className="text-center user-select-none mt-5">
          The optimal pattern was calculated for you based off given breeders:
        </h6>
        <div className="d-flex justify-content-center relative">
          {levels.map((level) => (
            <div
              key={level}
              className="col-2 d-inline-block d-flex flex-column justify-content-between text-center"
            >
              <br></br>
              {tree[level].map((poke, index) => (
                <div key={level + index}>
                  {/* <TreeCell
                    poke={poke}
                    target={target}
                    level={level}
                    index={index}
                    braces={braces}
                    logCoordinates={this.logCoordinates}
                  ></TreeCell> */}
                  <p>{level}</p>
                </div>
              ))}
            </div>
          ))}
          <canvas className="canvas" ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Tree;
