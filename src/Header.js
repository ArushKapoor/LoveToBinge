import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    // Creating the navbar or the header of website
    <nav className="header">
      <Link className="header__link" to="/">
        <p className="header__name">Love To Binge</p>
      </Link>
    </nav>
  );
}

// Anything that we have to use outside of this file, we export it
export default Header;
