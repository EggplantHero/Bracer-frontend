import React from "react";
import Tree from "./History/tree";
import { useParams } from "react-router";

const History = () => {
  let { treeid } = useParams();
  return (
    <div className="container">
      <div className="mx-auto">history</div>
      <Tree treeid={treeid} />
    </div>
  );
};

export default History;
