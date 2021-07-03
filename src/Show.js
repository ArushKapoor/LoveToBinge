import React from "react";
import "./Show.css";

function Show({ img, name }) {  
  return (
    <div className="show">
      <img className="show__img" src={img} />
      <p className="show__name">{name}</p>
    </div>
  );
}

export default Show;
