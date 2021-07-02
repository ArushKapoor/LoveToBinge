import React from "react";
import "./RankShow.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function RankShow({ rank, name, img }) {
  return (
    // Creating the layout of the cards on Ranking page
    <div className="rankShow">
      <p className="rankShow__rank font-weight-bold my-auto">{rank}</p>
      <img className="rankShow__img" src={img} />
      <h1 className="rankShow__name font-weight-bold">{name}</h1>
    </div>
  );
}

// Anything that we have to use outside of this file, we export it
export default RankShow;
