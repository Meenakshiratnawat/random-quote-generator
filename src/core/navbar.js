import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <ul className="nav nav-tabs py-3 ">
        <li className="nav-item">
          <NavLink
            className="nav-link  text-light "
            activeClassName="active"
            exact
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link text-light "
            activeClassName="active"
            exact
            to="/bookmarks"
          >
            Bookmarks
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
export default Navbar;
