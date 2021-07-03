import React from "react";
import "./Filters.css";
import { useStateValue } from "./StateProvider";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Filters() {
  // Calling in the data layer/ global variable
  // filter contains either "anime" or "show"
  const [{ filter }, dispatch] = useStateValue();

  // This method changes filter value and triggers
  // useEffect
  const setFilter = (filter) => {
    dispatch({
      type: "CHANGE_FILTER",
      filter: filter,
    });
  };
  return (
    <div className="filters" style={{ backgroundColor: "#F8F8F8" }}>
      {/* Adding conditional css classes selected and not-selected */}
      <button
        className={`filters__shows ${
          filter == "shows" ? "selected" : "not-selected"
        }`}
        // () => setFilter("") used to send arguments to setFilter method
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

// Anything that we have to use outside of this file, we export it
export default Filters;
