import React, { useEffect, useState } from "react";
import { getImg } from "../../utils/pokeApi";
import { useDispatch, useSelector } from "react-redux";
import { addBreeder, getBreeders } from "../../store/breeders";
import { ivClass, genderIcons } from "../../utils/remap";
import { getSelectedIds, getSelectedTool, setSelectedId } from "../../store/ui";

const BreederInspect = () => {
  const [url, setUrl] = useState("");
  const selectedIds = useSelector(getSelectedIds);
  const breeders = useSelector(getBreeders);
  const [selected] = breeders.filter(
    (breeder) => breeder.id === selectedIds[0]
  );
  console.log(selected);

  useEffect(() => {
    if (!selected) return;
    const getImage = async () => {
      const url = await getImg(selected.data.name);
      setUrl(url);
    };
    getImage();
  }, [selected]);

  return (
    <div>
      <div className="card my-2">
        <div className="card-title">
          {selected && (
            <h4 className="my-2">
              <span className={selected.data.gender}>
                {genderIcons[selected.data.gender].icon}
              </span>
              {selected.data.name}
            </h4>
          )}
        </div>
        <div className="my-3">
          <div className="col-12 col-sm-6 col-md-4 offset-md-4 d-inline-block">
            <div className="mx-auto imageParent bordered">
              <img className="pe-none" src={url} alt="" />
            </div>
          </div>
          <div className="col-sm-6 col-md-4 d-inline-block mt-2">
            <div className="mx-3">
              {selected &&
                selected.data.eggGroups.map((group, index) => (
                  <p key={index} className="badge d-block">
                    {group}
                  </p>
                ))}
            </div>
          </div>
          <div className="d-flex justify-content-center">
            {selected &&
              Object.keys(selected.data.ivs).map((iv) => (
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
    </div>
  );
};

export default BreederInspect;
