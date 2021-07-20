import React, { useContext, useEffect, useState } from "react";
import FormContext from "../../contexts/formContext";
import { getImg } from "../../utils/pokeApi";

const PokeLookup = () => {
  const [formState] = useContext(FormContext);
  const [url, setUrl] = useState("");
  const poke = formState;

  useEffect(() => {
    const getImage = async () => {
      const url = await getImg(poke.name);
      setUrl(url);
    };
    getImage();
  }, [poke.name]);

  return (
    <div className="my-3">
      <div className="col-12 col-md-4 offset-md-4 d-inline-block">
        <div className="mx-auto imageParent bordered">
          <img className="pe-none" src={url} alt="" />
        </div>
      </div>
      <div className="col-md-4 d-inline-block mt-2">
        <div className="mx-3">
          {poke.eggGroups.map((group, index) => (
            <p key={index} className="badge d-block">
              {group}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokeLookup;
