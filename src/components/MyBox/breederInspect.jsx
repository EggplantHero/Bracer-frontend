import React, { useEffect, useState } from "react";
import { getImg } from "../../utils/pokeApi";
import { ivClass, genderIcons } from "../../utils/remap";

const BreederInspect = ({ selected }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!selected) return;
    const getImage = async () => {
      const url = await getImg(selected.name);
      setUrl(url);
    };
    getImage();
  }, [selected]);

  return (
    <div className="card my-2">
      {selected && (
        <div>
          <div className="card-title">
            <h4 className="my-2">
              <span className={selected.gender}>
                {genderIcons[selected.gender].icon}
              </span>
              {selected.name}
            </h4>
          </div>
          <div className="my-3">
            <div className="col-12 col-sm-6 col-md-4 offset-md-4 d-inline-block">
              <div className="mx-auto imageParent bordered">
                <img className="pe-none" src={url} alt="" />
              </div>
            </div>
            <div className="col-sm-6 col-md-4 d-inline-block mt-2">
              <div className="mx-3">
                {selected.eggGroups.map((group, index) => (
                  <p key={index} className="badge d-block">
                    {group}
                  </p>
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-center">
              {Object.keys(selected.ivs).map((iv) => (
                <div key={iv}>
                  {selected.ivs[iv] !== -1 && (
                    <p className="p-2 mx-2">
                      <span className={ivClass(selected.ivs[iv])}>
                        {selected.ivs[iv]}
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
