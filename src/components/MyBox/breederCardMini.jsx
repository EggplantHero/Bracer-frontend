import React, { useEffect, useState } from "react";
import { genderIcons } from "../../utils/remap";
import { getImgSm } from "../../utils/pokeApi";
import { useDispatch } from "react-redux";
import { removeBreeder } from "../../store/breeders";
import { BsTrash } from "react-icons/bs";

const BreederCardMini = ({ breeder, config, setSelected }) => {
  const dispatch = useDispatch();
  const { data, id } = breeder;
  const { name, gender } = data;
  const [url, setUrl] = useState("");

  useEffect(() => {
    const setImg = async () => {
      const url = await getImgSm(name);
      setUrl(url);
    };
    setImg();
  }, [name]);

  return (
    <div className="breederContainerMini card">
      <h6 className="my-0">
        <span className={gender}>{genderIcons[gender].icon}</span>
        {breeder.data.name}
      </h6>
      <button
        className="btn mx-1 my-2"
        onClick={() => setSelected(breeder.data)}
      >
        <img src={url} alt="" className="pe-none"></img>
      </button>
      <div className="d-flex justify-content-end">
        {config && (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => dispatch(removeBreeder(id))}
          >
            <BsTrash />
          </button>
        )}
      </div>
    </div>
  );
};

export default BreederCardMini;
