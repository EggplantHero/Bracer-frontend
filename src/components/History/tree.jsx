import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrees } from "../../store/trees";
import TreeCell from "./treeCell";

const Tree = ({ treeid }) => {
  // const dispatch = useDispatch();
  const trees = useSelector(getTrees);
  const [tree, setTree] = useState({});
  const [levels, setLevels] = useState([]);

  const getTreeById = (trees, treeid) => {
    const [tree] = trees.filter((tree) => tree.id === parseInt(treeid));
    return tree;
  };

  const getLevels = (tree) => {
    const levels = Object.keys(tree.data);
    return levels;
  };

  useEffect(() => {
    const tree = getTreeById(trees, treeid);
    setTree(tree);
    setLevels(getLevels(tree));
  }, [treeid, trees, tree]);

  const canvasRef = useRef(null);
  console.log("levels", levels);

  return (
    <div>
      <div className="user-select-none">
        {treeid}
        <h6 className="text-center user-select-none mt-5">
          The optimal pattern was calculated for you based off given breeders:
        </h6>
        <div className="d-flex justify-content-center relative">
          {levels.length > 0 &&
            levels.map((level) => (
              <div
                key={level}
                className="col-2 d-inline-block d-flex flex-column justify-content-between text-center"
              >
                <br></br>
                {tree.data[level].map((poke, index) => (
                  <div key={level + index}>
                    {poke.data && (
                      <TreeCell
                        poke={poke}
                        level={level}
                        index={index}
                      ></TreeCell>
                    )}
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
