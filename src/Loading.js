import React from "react";
import "./Loading.css";
import loading from "./images/loading.png";

function Loading() {
  return (
    <div className="loading">
      <img className="loading__img" src={loading} alt="loading" />
      <p className="loading__name">Loading</p>
    </div>
  );
}

export default Loading;
