import React, { useEffect } from "react";
import Tree from "./tree";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getTrees, removeTree } from "../../store/trees";
import { getTreeById } from "../../utils/tree";
import { useState } from "react";

const MyBreeds = () => {
  let { treeid } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const trees = useSelector(getTrees);
  const [currentTree, setCurrentTree] = useState();

  useEffect(() => {
    setCurrentTree(getTreeById(trees, treeid));
  }, [treeid, trees]);

  const handleDelete = () => {
    dispatch(removeTree(parseInt(treeid)));
    history.push("/");
  };

  return (
    <div>
      <h6 className="text-center user-select-none mt-5">
        The optimal pattern was calculated for you based off given breeders:
      </h6>
      {currentTree && <Tree tree={currentTree} />}
      <div className="d-flex justify-content-center my-5">
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete Tree From History
        </button>
      </div>
    </div>
  );
};

export default MyBreeds;
