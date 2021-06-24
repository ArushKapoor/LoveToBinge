import React from "react";
import "./Show.css";

function Show({ img, name }) {
  return (
    <div className="show">
      <img src={img} />
      <h1>{name}</h1>
    </div>
  );
}

export default Show;
