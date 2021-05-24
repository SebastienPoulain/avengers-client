import React from "react";
import "./InfosAvenger.css";

const InfosAvenger = ({ infos }) => {
  const { name, description, urls, thumbnail } = infos;

  const setButton = (index) => {
    if (urls[index]?.url && urls[index]?.type) {
      return (
        <button className="infosAvenger__btn">
          <a target="_blank" href={urls[index]?.url}>
            {urls[index]?.type}
          </a>
        </button>
      );
    }
  };
  return (
    <div className="infosAvenger">
      <h1>{name}</h1>
      <img src={`${thumbnail?.path}.${thumbnail?.extension}`} alt={name} />
      <p style={!description ? { margin: "25px" } : { margin: "10px" }}>
        {description ? description : "Description indisponible ..."}
      </p>
      <div className="infosAvenger__btns">
        {setButton(0)}
        {setButton(1)}
        {setButton(2)}
      </div>
    </div>
  );
};

export default InfosAvenger;
