import React from "react";
import "./Show.css";

function Show({ img, name }) {
  return (
    // Creating the layout of how each show should look
    <div className="show">
      <img className="show__img" src={img} />
      <div className="show__name__div">
        <p className="show__name">{name}</p>
      </div>
    </div>
  );
}

// Anything that we have to use outside of this file, we export it
export default Show;
