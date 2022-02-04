import React from "react";
import { useSelector } from "react-redux";
import { getBreeders } from "../../store/breeders";

const PageHandler = ({ page, setPage, pageSize }) => {
  const breeders = useSelector(getBreeders);

  const nums = [
    {
      value: -1,
      sign: "-",
      disabled: page - 1 < 0,
    },
    {
      value: 1,
      sign: "+",
      disabled: page + 1 > Math.ceil(breeders.length / pageSize) - 1,
    },
  ];

  return (
    <div>
      <h6>Box #{page + 1}</h6>
      <div className="d-flex justify-content-between">
        {nums.map((num) => (
          <div>
            <button
              className={`btn btn-secondary mx-1 ${num.disabled && "disabled"}`}
              onClick={() => setPage(page + num.value)}
            >
              {num.sign}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageHandler;
