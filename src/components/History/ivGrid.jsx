import React from "react";
import { statColors } from "../../utils/remap";

const IvGrid = ({ ivs }) => {
  const ivKeys = ["hp", "atk", "def", "spa", "spd", "spe"];

  return (
    <div className="mx-2">
      <div className="container-fluid">
        <div className="row">
          {ivKeys.map((iv) => (
            <div key={iv} className="col-4 card ivCell">
              {ivs[iv] !== -1 && (
                <h6 style={{ color: statColors[iv] }}>
                  {ivs[iv]} {iv.toUpperCase()}
                </h6>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IvGrid;
