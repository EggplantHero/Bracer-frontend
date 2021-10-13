import React from "react";
import Tree from "./tree";
import { useHistory, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { getTrees, removeTree } from "../../store/trees";

const History = () => {
  let { treeid } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = () => {
    console.log("deleting...");
    dispatch(removeTree(parseInt(treeid)));
    history.push("/");
  };

  return (
    <div>
      <h6 className="text-center user-select-none mt-5">
        The optimal pattern was calculated for you based off given breeders:
      </h6>
      <Tree treeid={treeid} />
      <div className="d-flex justify-content-center my-5">
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete Tree From History
        </button>
      </div>
    </div>
  );
};

export default History;
