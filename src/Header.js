import React from "react";
import "./Header.css";
import { useStateValue } from "./StateProvider";

function Header() {
  const [{}, dispatch] = useStateValue();

  const setFilter = (filter) => {
    dispatch({
      type: "CHANGE_FILTER",
      filter: filter,
    });
  };

  return (
    <div className="header">
      <nav className="header__top">
        <h1>Building Love To Binge</h1>
      </nav>
      <div className="header__options">
        <button onClick={() => setFilter("shows")}>Shows</button>
        <button onClick={() => setFilter("anime")}>Anime</button>
      </div>
    </div>
  );
}

export default Header;
