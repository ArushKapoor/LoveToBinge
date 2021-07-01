import React from "react";
import "./RankShow.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function RankShow({ rank, name, img }) {
  return (
    <div className="rankShow row my-5 ml-2">
      <p className="rankShow__rank display-4 font-weight-bold my-auto">
        {rank}
      </p>
      <img className="rankShow__img mx-4" src={img} />
      <h1 className="rankShow__name display-4 font-weight-bold">{name}</h1>
    </div>
  );
}

export default RankShow;
