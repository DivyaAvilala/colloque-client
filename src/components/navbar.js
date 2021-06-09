import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <NavLink className="navbar-brand" to="/home/lectures">
        Campus Colloque
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="navbar-nav mr-auto">
          <NavLink className="nav-item nav-link" to="/home/lectures">
            Lectures
          </NavLink>
          <NavLink className="nav-item nav-link" to="/home/articles">
            Articles
          </NavLink>
          <NavLink className="nav-item nav-link" to="/logout">
            Logout
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
