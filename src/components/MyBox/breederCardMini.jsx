import React, { useEffect, useState } from "react";
import { genderIcons, summarizeIvs } from "../../utils/remap";
import { getImgSm } from "../../utils/pokeApi";
import { useDispatch } from "react-redux";
import { removeBreeder } from "../../store/breeders";
import { BsTrash } from "react-icons/bs";

const BreederCardMini = ({ breeder, config, setSelected }) => {
  const dispatch = useDispatch();
  const { data, id } = breeder;
  const { name, ivs, gender } = data;
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
      <button
        className="btn"
        onClick={() => {
          config === "inspect"
            ? setSelected(breeder.data)
            : console.log("delete");
        }}
      >
        <h6 className="my-0 d-flex justify-content-center">
          <span className={gender}>{genderIcons[gender].icon}</span>
          <span>{breeder.data.name}</span>
        </h6>
        <div>
          <img src={url} alt="" className="pe-none"></img>
        </div>
        <h6>{summarizeIvs(ivs)}</h6>
      </button>
    </div>
  );
};

export default BreederCardMini;
