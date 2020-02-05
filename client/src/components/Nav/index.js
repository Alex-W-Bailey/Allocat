import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul className="nav justify-content-center">
        <li className="nav-item">Cool Project Managment App</li>
        <li className="nav-item">
          <Link to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            A Fake Link
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
