import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import title from "./images/title.png";

function Header() {
  return (
    // Creating the navbar or the header of website
    <nav className="header">
      <Link className="header__link" to="/">
        {/* <p className="header__name">Love To Binge</p> */}
        <img className="header__title" src={title} alt="Title" />
      </Link>
    </nav>
  );
}

// Anything that we have to use outside of this file, we export it
export default Header;
