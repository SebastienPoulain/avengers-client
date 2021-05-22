import React from "react";
import "./Card.css";

const Card = ({ avenger }) => {
  const { name, description, thumbnail } = avenger;
  return (
    <div className="card__card">
      <div className="card__inner">
        <div className="card__front">
          <img
            src={`${thumbnail?.path}/portrait_incredible.${thumbnail?.extension}`}
            alt={name}
          />
        </div>
        <div className="card__back">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
