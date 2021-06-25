import React from "react";
import "./RankShow.css";

function RankShow({ rank, name, img }) {
  return (
    <div className="rankShow">
      <h1 className="rankShow__rank">{rank}</h1>
      <img className="rankShow__img" src={img} />
      <h1 className="rankShow__name">{name}</h1>
    </div>
  );
}

export default RankShow;
