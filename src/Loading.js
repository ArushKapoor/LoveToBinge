import React from "react";
import "./Loading.css";
import loading from "./images/loading.png";
import loadingCircle from "./images/loading_circle.png";
import loadingSymbol from "./images/loading_symbol.png";

function Loading() {
  return (
    <div className="loading">
      {/* <div className="loading__img">
        <img
          className="loading__imgCircle"
          src={loadingCircle}
          alt="Loading Circle"
        />
        <img
          className="loading__imgSymbol"
          src={loadingSymbol}
          alt="Loading Symbol"
        />
      </div> */}
      <div className="loading__nameContainer">
        <p className="loading__name">L</p>
        <div className="loading__img">
          <img
            className="loading__imgCircle"
            src={loadingCircle}
            alt="Loading Circle"
          />
          <img
            className="loading__imgSymbol"
            src={loadingSymbol}
            alt="Loading Symbol"
          />
        </div>
        <p className="loading__name">ading</p>
      </div>
    </div>
  );
}

export default Loading;
