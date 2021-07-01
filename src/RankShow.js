import React from "react";
import "./RankShow.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function RankShow({ rank, name, img }) {
  return (
    <div className="rankShow ml-2">
      <p className="rankShow__rank font-weight-bold my-auto">{rank}</p>
      <img className="rankShow__img" src={img} />
      <h1 className="rankShow__name font-weight-bold">{name}</h1>
    </div>
  );
}

export default RankShow;
