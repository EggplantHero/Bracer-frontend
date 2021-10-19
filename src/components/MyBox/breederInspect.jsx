import React, { useEffect, useState } from "react";
import { getImg } from "../../utils/pokeApi";
import { useSelector } from "react-redux";
import capitalize from "../../utils/capitalize";
import { ivClass, genderIcons } from "../../utils/remap";
import { getSelectedIds } from "../../store/ui";
import { getBreeders } from "../../store/breeders";
import { getCache } from "../../store/pokeapi";

const BreederInspect = () => {
  const cache = useSelector(getCache);
  const selectedIds = useSelector(getSelectedIds);
  const breeders = useSelector(getBreeders);
  const [selected] = breeders.filter(
    (breeder) => breeder.id === selectedIds[0]
  );
  console.log("selected", selected);

  return (
    <div>
      {selected && (
        <div className="card my-2">
          <div className="card-title">
            <h4 className="my-2">
              <span className={selected.data.gender}>
                {genderIcons[selected.data.gender].icon}
              </span>
              {capitalize(selected.data.name)}
            </h4>
          </div>
          <div className="my-3">
            <div className="col-12 col-sm-6 col-md-4 offset-md-4 d-inline-block">
              <div className="mx-auto imageParent bordered">
                <img
                  className="pe-none"
                  src={cache[selected.data.name].sprite}
                  alt=""
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4 d-inline-block mt-2">
              <div className="mx-3">
                {selected.data.eggGroups.map((group, index) => (
                  <p key={index} className="badge d-block">
                    {group}
                  </p>
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-center">
              {Object.keys(selected.data.ivs).map((iv) => (
                <div key={iv}>
                  {selected.data.ivs[iv] !== -1 && (
                    <p className="p-2 mx-2">
                      <span className={ivClass(selected.data.ivs[iv])}>
                        {selected.data.ivs[iv]}
                      </span>
                      {` ${iv.toUpperCase()}`}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreederInspect;
