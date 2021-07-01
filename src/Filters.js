import React from "react";
import "./Filters.css";
import { useStateValue } from "./StateProvider";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Filters() {
  const [{}, dispatch] = useStateValue();

  const setFilter = (filter) => {
    dispatch({
      type: "CHANGE_FILTER",
      filter: filter,
    });
  };
  return (
    <div className="filters my-4">
      <button
        className="filters__shows btn btn-outline-dark"
        onClick={() => setFilter("shows")}
      >
        Shows
      </button>
      <button
        className="filters__anime btn btn-outline-dark"
        onClick={() => setFilter("anime")}
      >
        Anime
      </button>
    </div>
  );
}

export default Filters;
