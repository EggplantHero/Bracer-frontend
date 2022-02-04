import React, { useEffect, useState } from "react";
import BreederCardMini from "./breederCardMini";
import { useDispatch, useSelector } from "react-redux";
import { getBreeders, reorderBreeders } from "../../store/breeders";
import { addSelectedId, removeSelectedId, setSelectedId } from "../../store/ui";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import useViewport from "../../utils/viewport";
import PageHandler from "./pageHandler";
import SelectionTools from "./selectionTools";

const BreederBoxes = ({ setSelected }) => {
  const dispatch = useDispatch(reorderBreeders);
  const breeders = useSelector(getBreeders);
  const [slicedBreeders, setSlicedBreeders] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 24;
  const { gridSize } = useViewport();

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

  return (
    <div>
      <GridContextProvider onChange={onChange}>
        <GridDropZone
          id="items"
          boxesPerRow={gridSize}
          rowHeight={82}
          style={{ height: (82 * pageSize) / gridSize }}
        >
          {slicedBreeders.map((breeder) => (
            <GridItem key={breeder.id}>
              <BreederCardMini breeder={breeder}></BreederCardMini>
            </GridItem>
          ))}
        </GridDropZone>
      </GridContextProvider>
      <div className="d-flex justify-content-around">
        <PageHandler
          page={page}
          setPage={setPage}
          pageSize={pageSize}
        ></PageHandler>
        <SelectionTools />
      </div>
    </div>
  );
};

export default BreederBoxes;
