import React, { useState } from "react";
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
  const { gridSize } = useViewport();

  const onChange = (sourceId, sourceIndex, targetIndex, targetId) => {
    const nextState = swap(breeders, sourceIndex, targetIndex);
    dispatch(reorderBreeders(nextState));
  };

  return (
    <GridContextProvider onChange={onChange}>
      <GridDropZone
        id="items"
        className="d-flex justify-content-start"
        boxesPerRow={gridSize}
        rowHeight={100}
        style={{ height: "400px" }}
      >
        {breeders.map((breeder) => (
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
  );
};

export default BreederBoxes;
