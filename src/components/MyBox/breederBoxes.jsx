import React, { useEffect, useState } from "react";
import BreederCardMini from "./breederCardMini";
import { useDispatch, useSelector } from "react-redux";
import { getBreeders, reorderBreeders } from "../../store/breeders";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import useViewport from "../../utils/viewport";

const BreederBoxes = ({ setSelected, config }) => {
  const dispatch = useDispatch(reorderBreeders);
  const breeders = useSelector(getBreeders);
  const [slicedBreeders, setSlicedBreeders] = useState([]);
  const [page, setPage] = useState(0);
  const { gridSize } = useViewport();
  const pageSize = 24;

  const onChange = (sourceId, sourceIndex, targetIndex, targetId) => {
    const nextState = swap(
      breeders,
      sourceIndex + pageSize * page,
      targetIndex + pageSize * page
    );
    dispatch(reorderBreeders(nextState));
  };

  useEffect(() => {
    const start = pageSize * page;
    const end = pageSize * (page + 1);
    const slicedArray = breeders.slice(start, end);
    setSlicedBreeders(slicedArray);
  }, [page, breeders]);

  const handlePageChange = (inc) => {
    const pageCount = Math.ceil(breeders.length / pageSize);
    let newPage = page + inc;
    if (newPage < 0) return;
    if (newPage > pageCount - 1) return;
    setPage(newPage);
  };

  return (
    <div>
      <GridContextProvider onChange={onChange}>
        <GridDropZone
          id="items"
          className="d-flex justify-content-start"
          boxesPerRow={gridSize}
          rowHeight={82}
          style={{ height: "350px" }}
        >
          {slicedBreeders.map((breeder) => (
            <GridItem key={breeder.id}>
              <BreederCardMini
                breeder={breeder}
                setSelected={setSelected}
                config={config}
              ></BreederCardMini>
            </GridItem>
          ))}
        </GridDropZone>
      </GridContextProvider>
      {page !== 0 && (
        <div>
          <button onClick={() => handlePageChange(-1)}>-</button>
          <p>Box #{page + 1}</p>
          <button onClick={() => handlePageChange(1)}>+</button>
        </div>
      )}
    </div>
  );
};

export default BreederBoxes;
