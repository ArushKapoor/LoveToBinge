import React from "react";
import "./Filters.css";
import { useStateValue } from "./StateProvider";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Filters() {
  const [{ filter }, dispatch] = useStateValue();

  const setFilter = (filter) => {
    dispatch({
      type: "CHANGE_FILTER",
      filter: filter,
    });
  };
  return (
    <div className="filters" style={{ backgroundColor: "#F8F8F8" }}>
      <button
        className={`filters__shows ${
          filter == "shows" ? "selected" : "not-selected"
        }`}
        onClick={() => setFilter("shows")}
      >
        Shows
      </button>
      <button
        className={`filters__anime ${
          filter == "anime" ? "selected" : "not-selected"
        }`}
        onClick={() => setFilter("anime")}
      >
        Anime
      </button>
    </div>
  );
}

export default Filters;
