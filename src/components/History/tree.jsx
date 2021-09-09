import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getTrees } from "../../store/trees";
import TreeCell from "./treeCell";
import { getAllPokeNames } from "../../utils/pokeApi";

const Tree = ({ treeid }) => {
  const trees = useSelector(getTrees);
  const [tree, setTree] = useState({});
  const [levels, setLevels] = useState([]);
  const [allPokes, setAllPokes] = useState([]);

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

  useEffect(() => {
    getPokes();
  }, []);

  const getPokes = async () => {
    setAllPokes(await getAllPokeNames());
  };

  const canvasRef = useRef(null);
  console.log("levels", levels);

  const emptyPoke = {
    data: {
      name: "...",
      ivs: { hp: 1, atk: 1, def: 1, spa: 1, spd: 1, spe: 1 },
      gender: "a",
      item: "a",
      breeder: true,
    },
  };

  return (
    <div className="user-select-none">
      <div className="d-flex justify-content-center relative">
        {levels.length > 0 &&
          levels.map((level) => (
            <div
              key={level}
              className={`col-${
                12 / levels.length
              } d-inline-block d-flex flex-column justify-content-around text-center`}
            >
              {tree.data[level].map((poke, index) => (
                <div key={level + index}>
                  {poke.data ? (
                    <TreeCell
                      poke={poke}
                      level={level}
                      index={index}
                      treeId={tree.id}
                      allPokes={allPokes}
                    ></TreeCell>
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
