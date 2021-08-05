import React from "react";
import Tree from "./tree";
import { useParams } from "react-router";

const History = () => {
  let { treeid } = useParams();
  return (
    <div className="container">
      <h6 className="text-center user-select-none mt-5">
        The optimal pattern was calculated for you based off given breeders:
      </h6>
      <Tree treeid={treeid} />
    </div>
  );
};

export default History;
