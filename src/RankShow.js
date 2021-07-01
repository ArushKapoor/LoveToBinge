import React from "react";
import "./RankShow.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function RankShow({ rank, name, img }) {
  return (
    <div className="rankShow row my-5 ml-2">
      <h1 className="rankShow__rank mt-auto mb-3">{rank}</h1>
      <img className="rankShow__img rounded mx-4 w-25" src={img} />
      <h1 className="rankShow__name">{name}</h1>
    </div>
  );
}

export default RankShow;
